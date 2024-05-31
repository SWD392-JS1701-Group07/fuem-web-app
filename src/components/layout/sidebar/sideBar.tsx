import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const Siderbar = () => {
    return (
        <div className="min-h-screen bg-purple-400 w-1/6 text-gray-50 shadow-2xl">
            <Accordion type="single" collapsible className="mx-3">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Event</AccordionTrigger>
                    {/* <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent> */}
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Participant</AccordionTrigger>
                    {/* <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent> */}
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Sponsor</AccordionTrigger>
                    {/* <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent> */}
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Siderbar;