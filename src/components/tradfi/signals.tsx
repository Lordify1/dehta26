import { useEffect } from "react";
import { rankSignals, signalsFor } from "@/lib/tradfi/model";
import { useDesk } from "@/lib/tradfi/store";

/** The signal book is the trade-setup cross. Land there for whichever domain is armed. */
export function SignalsScreen() {
  const domain = useDesk((s) => s.domain);
  const openSignal = useDesk((s) => s.openSignal);
  const go = useDesk((s) => s.go);

  useEffect(() => {
    const first = rankSignals(signalsFor(domain ?? "futures"))[0];
    if (first) openSignal(first.id);
    else go("brain");
  }, [domain, openSignal, go]);

  return null;
}
