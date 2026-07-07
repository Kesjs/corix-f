"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { Card } from "./card";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setIsVisible(true);
      }
    };
    
    checkConsent();
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t shadow-lg">
      <div className="max-w-7xl mx-auto">
        <Card className="p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestion des cookies
              </h3>
              <p className="text-gray-600 text-sm">
                Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques pour améliorer votre expérience. En acceptant, vous consentez à l&apos;utilisation de ces cookies conformément à notre politique de confidentialité.
              </p>
              <div className="mt-3 text-sm text-gray-500">
                <a 
                  href="/legal/privacy" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Politique de confidentialité
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReject}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Refuser
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Accepter
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}