import { useState, useMemo } from "react";
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
import { Check, ChevronsUpDown, Search, Calendar, Sparkles } from "lucide-react";
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

  // "Detecting words identifying thingy": split search into unique words
  const detectedKeywords = useMemo(() => {
    return Array.from(
      new Set(
        search
          .split(/\s+/)
          .map(w => w.trim())
          .filter(w => w.length > 0)
      )
    );
  }, [search]);

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
    <div
      className="space-y-4 rounded-2xl border border-[#03E1FF]/30 p-4 md:p-6 font-outfit"
      style={{
        background: "rgba(24, 26, 32, 0.8)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(0, 255, 163, 0.10)"
      }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#03E1FF]" />
          <Input
            placeholder="Search physicist by name..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-[#23243a]/80 border-2 border-[#03E1FF]/30 text-white placeholder:text-[#03E1FF]/60 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
          />
          {/* Detected keywords as chips */}
          {detectedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 ml-2">
              {detectedKeywords.map(word => (
                <span
                  key={word}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#00FFA3]/80 to-[#03E1FF]/80 text-black text-xs font-bold shadow"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Sparkles className="h-3 w-3 mr-1 text-[#DC1FFF]" />
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-48">
          <Select value={timeline} onValueChange={handleTimelineChange}>
            <SelectTrigger className="w-full bg-[#23243a]/80 border-2 border-[#03E1FF]/30 text-white rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 font-outfit">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00FFA3]" />
                <SelectValue placeholder="Select Era" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#181A20] border-[#03E1FF]/20 text-white font-outfit">
              {timelines.map((timeline) => (
                <SelectItem key={timeline.id} value={timeline.id} className="hover:bg-[#00FFA3]/10">
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
      className="w-full justify-between bg-[#23243a]/80 border-2 border-[#03E1FF]/30 text-white rounded-xl font-outfit focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40"
    >
      {topic ? topics.find(t => t === topic) : "Select Topic"}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[#03E1FF]" />
    </Button>
  </PopoverTrigger>
 <PopoverContent
  className="w-full p-0 bg-[#181A20] border-[#03E1FF]/20 font-outfit rounded-xl shadow-xl"
  sideOffset={4}
  align="start"
  style={{
    minWidth: "220px",
    background: "#181A20",
    color: "#fff",
    border: "1.5px solid #03E1FF33",
    boxShadow: "0 8px 32px 0 rgba(0,255,163,0.10)"
  }}
>
  <Command>
    {/* Custom search input instead of CommandInput */}
    <div className="flex items-center px-3 py-2 bg-[#23243a] border-b border-[#03E1FF]/20">
      <Search className="h-4 w-4 text-[#03E1FF] mr-2" />
      <input
        type="text"
        placeholder="Search topics..."
        className="flex-1 bg-transparent text-white placeholder:text-[#03E1FF] outline-none border-none font-outfit"
        onChange={(e) => {
          // You might need to implement search filtering here if needed
          // For now, CommandList will handle the filtering
        }}
      />
    </div>
    
    <CommandList className="bg-[#181A20] text-white font-outfit">
      <CommandEmpty className="text-[#DC1FFF] p-4">No topics found.</CommandEmpty>
      <CommandGroup>
        {topics.map((t) => (
          <CommandItem
            key={t}
            value={t}
            onSelect={() => handleTopicChange(t)}
            className={cn(
              "rounded-lg transition-all font-outfit cursor-pointer",
              "text-white bg-[#181A20]",
              "hover:bg-[#03E1FF]/20 hover:text-[#00FFA3]",
              topic === t ? "bg-[#03E1FF]/30 text-[#00FFA3]" : ""
            )}
            style={{
              padding: "0.6rem 1rem",
              fontWeight: topic === t ? 700 : 500,
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                topic === t ? "opacity-100 text-[#00FFA3]" : "opacity-0"
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
          className="text-[#DC1FFF] hover:text-[#00FFA3] hover:bg-[#00FFA3]/10 font-outfit"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
