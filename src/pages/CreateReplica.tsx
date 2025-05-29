import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Home, Wallet, Zap, Sparkles } from "lucide-react";
import { useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InterestSelector } from "@/components/InterestSelector";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ensureSensayUser, createSensayReplica } from "@/services/sensay";
import { uploadFileToIPFS } from "@/utils/pinata";
import { convertIPFSURL } from "@/utils/ipfs";

// Solana Colors
const SOLANA_GREEN = "#00FFA3";
const SOLANA_BLUE = "#03E1FF";
const SOLANA_PURPLE = "#DC1FFF";
const SOLANA_BG = "#181A20";

// For sparkle icon, you can use Lucide's Sparkles, Zap, or your favorite SVG/icon
const SparkleIcon = () => (
  <Sparkles className="inline-block text-[#00FFA3] mx-1 mb-1" size={20} />
);

const LightningIcon = () => (
  <Zap className="inline-block text-[#03E1FF] mx-1 mb-1" size={18} />
);

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  specialty: z.string().min(5, "Specialty must be at least 5 characters"),
  era: z.string().min(2, "Era must be at least 2 characters"),
  type: z.enum(["individual", "character", "brand"]),
  purpose: z.string()
    .min(10, "Purpose should be at least 10 characters")
    .max(200, "Purpose must be no more than 200 characters"),
  greeting: z.string().min(10, "Greeting must be at least 10 characters"),
  suggestedQuestions: z.array(z.string().min(5, "Each question must be at least 5 characters")).min(1, "At least one question required"),
  systemMessage: z.string().min(50, "System message must be at least 50 characters"),
  voicePreviewText: z.string().min(10, "Voice preview text must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const CreateReplica = () => {
  const { account, connectWallet } = useWallet();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      era: "Modern",
      type: "character",
      purpose: "",
      greeting: "",
      suggestedQuestions: [
        "What inspired your most famous work?",
        "How would you explain your key discovery to a child?"
      ],
      systemMessage: "",
      voicePreviewText: "How would you like me to speak son?",
    },
  });

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast({ title: "Wallet Connected", description: "Wallet connected successfully!" });
    } catch (error) {
      toast({ title: "Connection Failed", variant: "destructive" });
    }
  };

  const purposeValue = useWatch({ control: form.control, name: "purpose" }) || "";

  const handleAvatarUpload = async (file: File) => {
    try {
      const cid = await uploadFileToIPFS(file);
      const url = convertIPFSURL(cid);
      return url;
    } catch (error) {
      toast({ title: "Upload Failed", variant: "destructive" });
      throw error;
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!account) {
      toast({ title: "Connect Wallet", variant: "destructive" });
      return;
    }

    if (topics.length === 0) {
      toast({ title: "Select Topics", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      await ensureSensayUser(account, values.name);

      let avatarUrl = "";
      if (avatarFile) {
        avatarUrl = await handleAvatarUpload(avatarFile);
        if (avatarUrl && !avatarUrl.match(/\.(jpg|jpeg|png|bmp|webp|avif)$/i)) {
          avatarUrl += "/avatar.jpg";
        }
      }

      await createSensayReplica({
        name: values.name,
        specialty: values.specialty,
        era: values.era,
        type: values.type,
        purpose: values.purpose,
        greeting: values.greeting,
        ownerID: account,
        topics,
        avatarUrl: avatarUrl || "",
        suggestedQuestions: values.suggestedQuestions,
        userSystemMessage: values.systemMessage,
        voicePreviewText: values.voicePreviewText,
      });

      toast({ title: "Replica Created!" });
      navigate("/replicas");
    } catch (error) {
      toast({ title: "Error", description: "Failed to create replica", variant: "destructive" });
      console.error("[CreateReplica] Creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full font-outfit"
      style={{
        background: `
          linear-gradient(135deg, rgba(0,255,163,0.13) 0%, rgba(3,225,255,0.13) 50%, rgba(220,31,255,0.13) 100%),
          url("/bg.jpg"),
          linear-gradient(120deg, #000 0%, #181A20 100%)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <Breadcrumb className="mb-8 text-white">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home size={16} /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-white">Create Replica</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {!account ? (
          <Card className="bg-[#181A20]/95 border border-[#03E1FF]/30 shadow-xl max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-white font-outfit flex items-center gap-2">
                <SparkleIcon /> Connect Wallet
              </CardTitle>
              <CardDescription className="text-[#03E1FF] font-outfit">Required to create replicas</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={handleConnectWallet}
                className="bg-gradient-to-r from-[#DC1FFF] to-[#03E1FF] text-black font-bold font-outfit hover:scale-105 transition-transform"
              >
                <Wallet className="mr-2" /> Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Preview Panel */}
                <div className="md:col-span-1">
                  <Card className="bg-[#181A20]/95 border border-[#03E1FF]/30 shadow-xl sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-white font-outfit flex items-center gap-2">
                        <SparkleIcon /> Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative group flex flex-col items-center">
                        <label className="cursor-pointer block w-fit mx-auto">
                          <div className="h-32 w-32 rounded-lg border-2 border-[#03E1FF] bg-[#23243a] flex items-center justify-center overflow-hidden shadow-lg transition hover:brightness-110">
                            {avatar ? (
                              <img src={avatar} alt="avatar" className="object-cover h-full w-full" />
                            ) : (
                              <span className="text-5xl text-[#03E1FF]">+</span>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setAvatar(URL.createObjectURL(file));
                                setAvatarFile(file);
                              }
                            }}
                          />
                        </label>
                        <p className="text-center text-sm text-[#03E1FF] mt-2 font-outfit">
                          <LightningIcon /> Click to upload avatar
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-center text-white font-outfit">
                          {form.watch("name") || "New Physicist"}
                        </h3>
                        <p className="text-center text-[#00FFA3] font-outfit">
                          {form.watch("specialty") || "Specialty"}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-[#03E1FF] bg-[#03E1FF]/20 border border-[#03E1FF]/30 font-outfit">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Form Fields */}
                <div className="md:col-span-2 space-y-6">
                  <Card className="bg-[#181A20]/95 border border-[#03E1FF]/30 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white font-outfit flex items-center gap-2">
                        <SparkleIcon /> Core Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <SparkleIcon /> Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Marie Curie"
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                                <SparkleIcon /> Specialty
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nuclear Physics"
                                  className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="era"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                                <SparkleIcon /> Era
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="20th Century"
                                  className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <SparkleIcon /> Replica Type
                            </FormLabel>
                            <FormControl>
                              <select
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white rounded-xl p-2 w-full font-outfit focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition"
                                {...field}
                              >
                                <option value="character">Historical Character</option>
                                <option value="individual">Personal Replica</option>
                                <option value="brand">Organization/Brand</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <SparkleIcon /> Purpose
                            </FormLabel>
                            <FormDescription className="text-[#00FFA3] font-outfit">
                              Summarize your replica’s purpose in 200 characters or less.
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                maxLength={200}
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white min-h-[120px] rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                placeholder="E.g. Pioneering research on electric arcs and sand ripple formation; advocate for women in science."
                              />
                            </FormControl>
                            <div className={`text-xs mt-1 font-outfit ${purposeValue.length > 200 ? "text-[#DC1FFF]" : "text-[#03E1FF]"}`}>
                              {purposeValue.length}/200 characters
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="greeting"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <LightningIcon /> Greeting
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Hello, I'm Marie Curie. How can I help you?"
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="suggestedQuestions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <SparkleIcon /> Suggested Questions
                            </FormLabel>
                            <FormDescription className="text-[#00FFA3] font-outfit">
                              Add questions users might ask this replica (one per line)
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white min-h-[80px] rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                value={field.value.join('\n')}
                                onChange={e => field.onChange(e.target.value.split('\n').filter(q => q.trim().length > 0))}
                                placeholder="What inspired your most famous work?&#10;How would you explain your key discovery to a child?"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="systemMessage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <SparkleIcon /> AI Personality
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white min-h-[120px] rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                placeholder="Example: You're the real Albert Einstein texting through a time-travel app called Photon..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="voicePreviewText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#03E1FF] font-outfit flex items-center gap-1">
                              <LightningIcon /> Voice Preview Text
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Hi, I'm {name} - let's explore physics together!"
                                className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-[#181A20]/95 border border-[#00FFA3]/30 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white font-outfit flex items-center gap-2">
                        <SparkleIcon /> Expertise Areas
                      </CardTitle>
                      <CardDescription className="text-[#03E1FF] font-outfit">
                        Select topics this physicist can teach
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InterestSelector
                        selectedInterests={topics}
                        onSelectionChange={setTopics}
                      />
                    </CardContent>
                  </Card>
                  <div className="flex justify-end gap-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold font-outfit rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      <SparkleIcon />
                      {isSubmitting ? "Creating..." : "Create Replica"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>
      <style>{`
        * {
          font-family: 'Outfit', sans-serif !important;
        }
        ::selection {
          background: #03E1FF44;
        }
      `}</style>
    </div>
  );
};

export default CreateReplica;
