export default function formatCash(n) {
    // vi rut gon 1 = 1000
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3) + " Triệu";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6) + " Tỷ";
    // if (n >= 1e9 && n < 1e12) return +(n / 1e9) + " Tỷ";
    // if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
   
  };