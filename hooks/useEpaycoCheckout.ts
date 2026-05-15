"use client";

import { useEffect, useState } from "react";

// Declaración global para TypeScript
declare global {
  interface Window {
    ePayco: any;
  }
}

export function useEpaycoCheckout() {
  const [ePaycoHandler, setEPaycoHandler] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Evitar cargar el script múltiples veces
    if (document.getElementById("epayco-checkout-script")) {
      if (window.ePayco) {
        initHandler();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "epayco-checkout-script";
    script.src = "https://checkout.epayco.co/checkout.js";
    script.async = true;
    script.onload = () => {
      initHandler();
    };
    document.body.appendChild(script);

    return () => {
      // Opcional: limpieza del script si es necesario
    };
  }, []);

  const initHandler = () => {
    // La llave pública debe venir de las variables de entorno
    const publicKey = process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || "TU_PUBLIC_KEY_AQUI";

    if (window.ePayco) {
      const handler = window.ePayco.checkout.configure({
        key: publicKey,
        test: process.env.NEXT_PUBLIC_EPAYCO_TEST_MODE === "true" || true, // true para modo de pruebas
      });
      setEPaycoHandler(handler);
      setIsReady(true);
    }
  };

  const openCheckout = (data: {
    name: string;
    description: string;
    invoice: string;
    currency?: string;
    amount: string;
    tax_base?: string;
    tax?: string;
    country?: string;
    lang?: string;
    external?: "true" | "false";
    extra1?: string; // Para enviar metadata, ej: userId
    extra2?: string; // Para enviar el planId
  }) => {
    if (!ePaycoHandler) {
      console.error("ePayco is not loaded yet.");
      return;
    }

    const checkoutData = {
      ...data,
      currency: "cop",
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "es",
      external: "false", // Forzar a false siempre para OnPage
      confirmation: `${process.env.NEXT_PUBLIC_API_URL}/payments/confirm`, // URL directa al backend
      response: `${window.location.origin}/pago/respuesta`, // URL de respuesta usuario frontend
    };

    ePaycoHandler.open(checkoutData);
  };

  return { openCheckout, isReady };
}
