import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import {EventsProvider} from "@/state/contexts/EventsContext";
import Routes from "@/Routes";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <EventsProvider>
                <RouterProvider router={Routes()}/>
            </EventsProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
