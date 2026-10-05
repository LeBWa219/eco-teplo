import { useEffect, useState } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Leaf, Zap, Clock,
  Settings2, TrendingDown, RefreshCw, ChevronRight,
  CheckCircle, ArrowRight, Flame, Droplets, Plus, Minus,
  Thermometer, Gauge, Timer, Wifi, Shield, Wrench, DraftingCompass, Calculator,
} from "lucide-react";

export const ICONS = {
  "trending-down": TrendingDown,
  "refresh": RefreshCw,
  "leaf": Leaf,
  "zap": Zap,
  "clock": Clock,
  "settings": Settings2,
  "thermometer": Thermometer,
  "gauge": Gauge,
  "timer": Timer,
  "wifi": Wifi,
  "shield": Shield,
  "wrench": Wrench,
  "drafting-compass": DraftingCompass,
  "calculator": Calculator,
  "menu": Menu,
  "x": X,
  "phone": Phone,
  "mail": Mail,
  "map-pin": MapPin,
  "flame": Flame,
  "droplets": Droplets,
  "check": CheckCircle,
  "arrow-right": ArrowRight,
  "chevron-right": ChevronRight,
  "plus": Plus,
  "minus": Minus,
};

export function Icon({ name, size = 20, ...props }) {
  const Cmp = ICONS[name] || Leaf;
  return <Cmp size={size} {...props} />;
}

export function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
