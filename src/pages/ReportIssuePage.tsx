
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ImagePlus, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssuePage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    issueType: "",
    address: "",
    images: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, issueType: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setFormState((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 3), // Limit to 3 images
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Report Submitted Successfully",
        description: "Your water issue has been reported. You can track its status.",
      });
      
      // Reset form
      setFormState({
        title: "",
        description: "",
        issueType: "",
        address: "",
        images: [],
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Report a Water Issue</h1>
        <p className="text-gray-600 mb-8">
          Help your community by reporting water-related issues in your area.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formState.title}
                      onChange={handleInputChange}
                      placeholder="Brief description of the issue"
                      className="water-input mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="issueType">Issue Type</Label>
                    <Select
                      value={formState.issueType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="water-input mt-1">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leak">Water Leak</SelectItem>
                        <SelectItem value="contamination">Water Contamination</SelectItem>
                        <SelectItem value="pressure">Low Water Pressure</SelectItem>
                        <SelectItem value="outage">Water Outage</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                        <SelectItem value="flooding">Flooding</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      placeholder="Please provide details about the issue..."
                      className="water-input mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Location</Label>
                    <div className="relative">
                      <Input
                        id="address"
                        name="address"
                        value={formState.address}
                        onChange={handleInputChange}
                        placeholder="Enter address or location description"
                        className="water-input mt-1 pl-10"
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="images">Images (Optional)</Label>
                    <div className="mt-1">
                      <label 
                        htmlFor="image-upload" 
                        className="group cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:border-water-bright transition-colors"
                      >
                        <ImagePlus className="mb-2 text-gray-400 group-hover:text-water-bright" />
                        <p className="text-sm text-gray-600 group-hover:text-gray-900">
                          {formState.images.length === 0
                            ? "Click to upload images (max 3)"
                            : `${formState.images.length} image${formState.images.length > 1 ? "s" : ""} selected. Add more?`}
                        </p>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={formState.images.length >= 3}
                        />
                      </label>
                      
                      {formState.images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                          {formState.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="water-button w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Report"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-4">Reporting Tips</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <AlertCircle className="text-water-bright flex-shrink-0 h-5 w-5" />
                    <span className="text-sm text-gray-600">Be specific about the location and issue type.</span>
                  </li>
                  <li className="flex gap-2">
                    <AlertCircle className="text-water-bright flex-shrink-0 h-5 w-5" />
                    <span className="text-sm text-gray-600">Include clear photos if possible.</span>
                  </li>
                  <li className="flex gap-2">
                    <AlertCircle className="text-water-bright flex-shrink-0 h-5 w-5" />
                    <span className="text-sm text-gray-600">Provide contact information for follow-up.</span>
                  </li>
                  <li className="flex gap-2">
                    <AlertCircle className="text-water-bright flex-shrink-0 h-5 w-5" />
                    <span className="text-sm text-gray-600">For emergencies like major water main breaks, also call your local utility.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-water-soft border-none">
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">What happens next?</h3>
                <p className="text-sm text-gray-600">
                  After submitting your report, local water authorities will review the issue. You'll receive updates on status changes and can track progress through your account dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportIssuePage;
