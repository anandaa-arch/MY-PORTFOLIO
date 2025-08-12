import { Section } from "./section";
import { Badge } from "./ui";
import { skills } from "@/lib/data/skills";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-3 capitalize">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
