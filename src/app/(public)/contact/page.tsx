import { ContactSection } from "@/components/sections/ContactSection";
import {
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  createPageMetadata,
} from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
