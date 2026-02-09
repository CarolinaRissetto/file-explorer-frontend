import type { BreadcrumbSegment } from "@/types";
import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  segments: BreadcrumbSegment[];
  onNavigate: (id: string | null) => void;
}

export function BreadcrumbNav({ segments, onNavigate }: BreadcrumbNavProps) {
  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          return (
            <BreadcrumbItem key={seg.id ?? "root"}>
              {isLast ? (
                <BreadcrumbPage>{seg.name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    className="cursor-pointer"
                    onClick={() => onNavigate(seg.id)}
                  >
                    {seg.name}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
