"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  Users,
  Send,
  Inbox,
  Loader2,
  UserCircle,
} from "lucide-react";
import {
  getSentLikes,
  getReceivedLikes,
  removeLike,
  type LikeResponse,
  type PageResponse,
} from "../services/interactionService";

type Tab = "received" | "sent";

interface ProfileInteractionsProps {
  isPremium?: boolean;
}

export const ProfileInteractions = ({
  isPremium = false,
}: ProfileInteractionsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("received");
  const [receivedLikes, setReceivedLikes] = useState<LikeResponse[]>([]);
  const [sentLikes, setSentLikes] = useState<LikeResponse[]>([]);
  const [loadingReceived, setLoadingReceived] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"STUDENT" | "EMPLOYER">("STUDENT");

  useEffect(() => {
    const role = (localStorage.getItem("user_role") || "STUDENT").toUpperCase();
    setUserRole(role === "EMPLOYER" ? "EMPLOYER" : "STUDENT");
  }, []);

  const loadReceived = useCallback(async () => {
    setLoadingReceived(true);
    try {
      const data: PageResponse<LikeResponse> = await getReceivedLikes(
        0,
        20,
        userRole
      );
      setReceivedLikes(data.content || []);
    } catch (err) {
      console.error("Error loading received likes:", err);
    } finally {
      setLoadingReceived(false);
    }
  }, [userRole]);

  const loadSent = useCallback(async () => {
    setLoadingSent(true);
    try {
      const data: PageResponse<LikeResponse> = await getSentLikes(
        0,
        20,
        userRole
      );
      setSentLikes(data.content || []);
    } catch (err) {
      console.error("Error loading sent likes:", err);
    } finally {
      setLoadingSent(false);
    }
  }, [userRole]);

  useEffect(() => {
    if (userRole) {
      loadReceived();
      loadSent();
    }
  }, [userRole, loadReceived, loadSent]);

  const handleRemoveLike = async (targetProfileId: string) => {
    setRemovingId(targetProfileId);
    try {
      await removeLike(targetProfileId);
      setSentLikes((prev) =>
        prev.filter((like) => like.targetProfileId !== targetProfileId)
      );
    } catch (err) {
      console.error("Error removing like:", err);
    } finally {
      setRemovingId(null);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "received", label: "Te dieron Like", icon: Inbox },
    { key: "sent", label: "Tus Likes", icon: Send },
  ];

  const currentLoading =
    activeTab === "received" ? loadingReceived : loadingSent;
  const currentList = activeTab === "received" ? receivedLikes : sentLikes;

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${
        isPremium
          ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-5 border-b ${
          isPremium ? "border-white/40" : "border-gray-100"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isPremium
                ? "bg-gradient-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/15"
                : "bg-green-50 text-green-600"
            }`}
          >
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Interacciones
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Likes enviados y recibidos
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.key
                  ? isPremium
                    ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md"
                    : "bg-green-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {tab.key === "received"
                  ? receivedLikes.length
                  : sentLikes.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 min-h-[200px]">
        <AnimatePresence mode="wait">
          {currentLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-3"
            >
              <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
              <p className="text-sm text-gray-400 font-medium">Cargando...</p>
            </motion.div>
          ) : currentList.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-3"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  isPremium
                    ? "bg-gradient-to-br from-green-50 to-blue-50"
                    : "bg-gray-50"
                }`}
              >
                {activeTab === "received" ? (
                  <Inbox className="h-7 w-7 text-gray-300" />
                ) : (
                  <Send className="h-7 w-7 text-gray-300" />
                )}
              </div>
              <p className="text-sm text-gray-400 font-medium text-center">
                {activeTab === "received"
                  ? "Aún no has recibido likes"
                  : "Aún no has dado likes"}
              </p>
              <p className="text-xs text-gray-300 text-center max-w-[250px]">
                {activeTab === "received"
                  ? "Cuando alguien le dé like a tu perfil, aparecerá aquí."
                  : "Explora perfiles y da like a los que te interesen."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {currentList.map((like, idx) => (
                <motion.div
                  key={like.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                    isPremium
                      ? "bg-white/50 border-white/60 hover:bg-white/80"
                      : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="shrink-0">
                    {like.resolvedProfile?.imageUrl ? (
                      <img
                        src={like.resolvedProfile.imageUrl}
                        alt={like.resolvedProfile.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isPremium
                            ? "bg-gradient-to-br from-green-100 to-blue-100 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        <UserCircle size={28} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate capitalize">
                      {like.resolvedProfile?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">
                      {like.resolvedProfile?.description ||
                        (activeTab === "received"
                          ? `Le gustó tu perfil`
                          : `Le diste like`)}
                    </p>
                  </div>

                  {/* Action */}
                  {activeTab === "sent" && (
                    <button
                      onClick={() =>
                        handleRemoveLike(like.targetProfileId)
                      }
                      disabled={removingId === like.targetProfileId}
                      className="shrink-0 p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-200 cursor-pointer disabled:opacity-50"
                      title="Quitar Like"
                    >
                      {removingId === like.targetProfileId ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ThumbsDown size={18} />
                      )}
                    </button>
                  )}
                  {activeTab === "received" && (
                    <div
                      className={`shrink-0 p-2.5 rounded-xl ${
                        isPremium
                          ? "bg-gradient-to-br from-green-100 to-blue-100 text-green-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      <ThumbsUp size={18} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
