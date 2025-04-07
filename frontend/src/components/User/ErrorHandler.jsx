import { useCallback } from "react";

const createErrorHandler = (setErrors) => {
  return useCallback((errorResponse) => {
    if (!errorResponse) {
      setErrors({ general: "Unbekannter Fehler" });
      return;
    }

    // Fehler mit `errors` Objekt (z.B. { errors: { vorname: "...", telefonnummer: "..." } })
    if (errorResponse.errors) {
      setErrors(errorResponse.errors);
    }
    // Fehler mit einfacher Nachricht (z.B. { message: "Ungültige Telefonnummer!" })
    else if (errorResponse.message) {
      setErrors({ general: errorResponse.message });
    }
    // Falls komplett leer oder unlesbar
    else {
      setErrors({ general: "Ein unbekannter Fehler ist aufgetreten." });
    }
  }, [setErrors]);
};

export default createErrorHandler;
