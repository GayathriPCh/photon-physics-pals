
import { useState } from "react";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/types";
import { Check, ChevronsUpDown, Search, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhysicistFiltersProps {
  timelines: Timeline[];
  topics: string[];
  onFilterChange: (filters: {
    search: string;
    timeline: string;
    topic: string;
  }) => void;
}

export const PhysicistFilters = ({ timelines, topics, onFilterChange }: PhysicistFiltersProps) => {
  const [search, setSearch] = useState("");
  const [timeline, setTimeline] = useState("all");
  const [topic, setTopic] = useState("");
  const [topicOpen, setTopicOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    applyFilters(value, timeline, topic);
  };

  const handleTimelineChange = (value: string) => {
    setTimeline(value);
    applyFilters(search, value, topic);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    setTopicOpen(false);
    applyFilters(search, timeline, value);
  };

  const applyFilters = (search: string, timeline: string, topic: string) => {
    onFilterChange({
      search,
      timeline,
      topic
    });
  };

  const resetFilters = () => {
    setSearch("");
    setTimeline("all");
    setTopic("");
    onFilterChange({
      search: "",
      timeline: "all",
      topic: ""
    });
  };

  return (
    <div className="space-y-4 bg-black/40 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search physicist by name..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="w-full md:w-48">
          <Select value={timeline} onValueChange={handleTimelineChange}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Select Era" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {timelines.map((timeline) => (
                <SelectItem key={timeline.id} value={timeline.id}>
                  {timeline.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-64">
          <Popover open={topicOpen} onOpenChange={setTopicOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={topicOpen}
                className="w-full justify-between bg-background"
              >
                {topic ? topics.find(t => t === topic) : "Select Topic"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search topics..." />
                <CommandList>
                  <CommandEmpty>No topics found.</CommandEmpty>
                  <CommandGroup>
                    {topics.map((t) => (
                      <CommandItem
                        key={t}
                        value={t}
                        onSelect={() => handleTopicChange(t)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            topic === t ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {t}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          variant="ghost" 
          onClick={resetFilters}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
