"use client";
import React from 'react';
import { User, Building2, MapPin, CircleDollarSign, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export interface ChatMessageProps {
  id: string;
  type: 'user' | 'agent';
  content: string;
}

// Helper: Get plain text of a React node tree
const getPlainText = (node: any): string => {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join("");
  if (node.props && node.props.children) return getPlainText(node.props.children);
  return "";
};

// Helper: Find a link element inside React node tree
const findLink = (node: any): { href?: string; text?: string } | null => {
  if (!node) return null;
  if (React.isValidElement(node)) {
    if (node.type === 'a' || node.type === Link) {
      return {
        href: (node as any).props?.href,
        text: getPlainText((node as any).props?.children)
      };
    }
    if ((node as any).props?.children) {
      const children = React.Children.toArray((node as any).props.children);
      for (const child of children) {
        const link = findLink(child);
        if (link) return link;
      }
    }
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      const link = findLink(item);
      if (link) return link;
    }
  }
  return null;
};

// Helper: Parse list item to extract offer details
const parseLiNode = (children: React.ReactNode) => {
  const childrenArray = React.Children.toArray(children);
  
  // Separate header nodes (title/company text) from nested sublists
  const headerNodes = childrenArray.filter(
    (child: any) => !(React.isValidElement(child) && (child.type === 'ul' || child.type === 'ol'))
  );
  
  const listNodes = childrenArray.filter(
    (child: any) => React.isValidElement(child) && (child.type === 'ul' || child.type === 'ol')
  );
  
  const headerText = getPlainText(headerNodes);
  
  let company: string | undefined;
  let salary: string | undefined;
  let location: string | undefined;
  let linkHref: string | undefined;
  let linkText: string | undefined;
  
  // Find link in headerNodes
  const headerLink = findLink(headerNodes);
  if (headerLink) {
    linkHref = headerLink.href;
    linkText = headerLink.text;
  }
  
  // Parse nested list nodes if present
  if (listNodes.length > 0) {
    listNodes.forEach((listNode: any) => {
      if ((listNode as any).props && (listNode as any).props.children) {
        const subItems = React.Children.toArray((listNode as any).props.children);
        subItems.forEach((subItem: any) => {
          if (React.isValidElement(subItem) && subItem.type === 'li') {
            const text = getPlainText((subItem as any).props.children);
            
            if (/empresa:/i.test(text)) {
              company = text.replace(/empresa:\s*/i, '').trim();
            } else if (/salario:|sueldo:/i.test(text)) {
              salary = text.replace(/(salario|sueldo):\s*/i, '').trim();
            } else if (/ubicaci[oó]n:|ciudad:|direcci[oó]n:/i.test(text)) {
              location = text.replace(/(ubicaci[oó]n|ciudad|direcci[oó]n):\s*/i, '').trim();
            }
            
            // Check for links inside sub-items
            const subLink = findLink(subItem);
            if (subLink) {
              linkHref = subLink.href;
              linkText = subLink.text;
            }
          }
        });
      }
    });
  }
  
  // Fallback: Parse inline details if no nested list was found
  if (!company || !salary || !location) {
    const companyMatch = headerText.match(/empresa:\s*([^|•\-\n]+)/i);
    if (companyMatch) company = companyMatch[1].trim();
    
    const salaryMatch = headerText.match(/(salario|sueldo):\s*([^|•\-\n]+)/i);
    if (salaryMatch) salary = salaryMatch[2].trim();
    
    const locationMatch = headerText.match(/(ubicaci[oó]n|ciudad|direcci[oó]n):\s*([^|•\-\n]+)/i);
    if (locationMatch) location = locationMatch[1].trim();
  }
  
  // clean trailing characters from titleNode if any
  const cleanTitleNode = (nodes: any[]): React.ReactNode => {
    // If the last node is a string ending with : or - or •, we can trim it
    if (nodes.length > 0) {
      const lastIdx = nodes.length - 1;
      const lastNode = nodes[lastIdx];
      if (typeof lastNode === 'string') {
        const trimmed = lastNode.trim().replace(/[:\-•\s]+$/, '');
        const newNodes = [...nodes];
        newNodes[lastIdx] = trimmed;
        return newNodes;
      }
    }
    return nodes;
  };
  
  const hasOfferLink = !!(linkHref && (
    linkHref.includes('/postulacion/') || 
    linkHref.includes('/applicants/') || 
    linkHref.includes('/compatibility/')
  ));
  
  const hasMultipleFields = !!(
    (company && salary) || 
    (company && location) || 
    (salary && location)
  );
  
  const isOffer = hasOfferLink || hasMultipleFields;
  
  return {
    titleNode: cleanTitleNode(headerNodes),
    company,
    salary,
    location,
    linkHref,
    linkText,
    isOffer
  };
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  const isAgent = type === 'agent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 w-full ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}
    >
      {/* Indicador agente */}
      {isAgent && (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-4 self-start" />
      )}

      {/* Bubble */}
      <div
        className={`relative max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-xl text-[14px] leading-relaxed shadow-sm ${
          isAgent
            ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/20'
        }`}
      >
        {isAgent ? (
          <ReactMarkdown
            components={{
              ol: ({ children }) => <ol className="list-decimal pl-5 my-2 space-y-2 text-gray-800">{children}</ol>,
              ul: ({ children }) => <ul className="list-disc pl-5 my-2 space-y-2 text-gray-800">{children}</ul>,
              li: ({ node, children, ...props }) => {
                const parsed = parseLiNode(children);

                if (parsed.isOffer) {
                  const isEmployerOffer = parsed.linkHref?.includes('/empleador/') || parsed.linkHref?.includes('/applicants/') || parsed.linkHref?.includes('/compatibility/');
                  
                  const accentBorder = isEmployerOffer ? 'border-l-4 border-l-emerald-500 bg-emerald-50/10' : 'border-l-4 border-l-blue-500 bg-blue-50/10';
                  const badgeBg = isEmployerOffer ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50' : 'bg-blue-50 text-blue-700 border-blue-100/50';
                  const buttonBg = isEmployerOffer ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10';
                  const glowColor = isEmployerOffer ? 'bg-emerald-500/5' : 'bg-blue-500/5';
                  const dollarColor = isEmployerOffer ? 'text-emerald-500' : 'text-blue-500';

                  return (
                    <div className={`relative my-3 p-4 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-xs shadow-xs hover:shadow-md transition-all duration-300 ${accentBorder} list-none overflow-hidden group`}>
                      {/* Subtle background glow */}
                      <div className={`absolute -right-4 -top-4 w-20 h-20 ${glowColor} rounded-full blur-xl pointer-events-none transition-all duration-300 group-hover:scale-125`} />

                      {/* Title */}
                      <div className="text-sm font-bold text-gray-900 tracking-tight block mb-2 leading-snug">
                        {parsed.titleNode}
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {parsed.company && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <Building2 size={13} className="text-gray-400 shrink-0" />
                            <span className="truncate">{parsed.company}</span>
                          </div>
                        )}

                        {parsed.location && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <MapPin size={13} className="text-gray-400 shrink-0" />
                            <span className="truncate">{parsed.location}</span>
                          </div>
                        )}

                        {parsed.salary && (
                          <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-md border w-fit ${badgeBg}`}>
                            <CircleDollarSign size={13} className={`${dollarColor} shrink-0`} />
                            <span>{parsed.salary}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Link */}
                      {parsed.linkHref && (
                        <Link
                          href={parsed.linkHref}
                          className={`mt-3.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white rounded-lg transition-all shadow-xs ${buttonBg}`}
                        >
                          {parsed.linkText || 'Ver detalles'}
                          <ExternalLink size={11} className="shrink-0" />
                        </Link>
                      )}
                    </div>
                  );
                }

                // Default list item
                return (
                  <li className="text-[14px] leading-relaxed text-gray-800 my-0.5">
                    {children}
                  </li>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="whitespace-pre-wrap">{content}</div>
        )}
      </div>

      {/* User Avatar */}
      {!isAgent && (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};
