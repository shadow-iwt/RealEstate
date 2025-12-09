import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "@/components/property-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Building2, LayoutGrid, List } from "lucide-react";
import { Link } from "wouter";
import type { Property } from "@/lib/types";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "popular", label: "Most Popular" },
];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = properties
    ?.filter((property) => {
      const matchesSearch =
        searchQuery === "" ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || (property.status || "").toLowerCase() === statusFilter.toLowerCase();
      const matchesType = typeFilter === "all" || (property.propertyType || "").toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    })
    ?.sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      }
    });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-properties-title">
            Properties
          </h1>
          <p className="text-muted-foreground">
            Manage your property listings and track their performance.
          </p>
        </div>
        <Link href="/properties/new">
          <Button className="gap-2" data-testid="button-new-property">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-properties"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36" data-testid="select-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36" data-testid="select-type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-[4/3]" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProperties && filteredProperties.length > 0 ? (
        <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Building2 className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold text-lg mb-1">No properties found</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Add your first property listing to get started."}
            </p>
            {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
              <Link href="/properties/new">
                <Button className="mt-6 gap-2" data-testid="button-add-first-property">
                  <Plus className="h-4 w-4" />
                  Add Property
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
