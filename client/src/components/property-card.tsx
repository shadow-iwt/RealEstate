import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Ruler, MapPin, Eye, Heart, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Property } from "@shared/schema";
import { Link } from "wouter";

interface PropertyCardProps {
  property: Property;
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
}

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  sold: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  rented: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const propertyTypeLabels: Record<string, string> = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  townhouse: "Townhouse",
  land: "Land",
  commercial: "Commercial",
};

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(property.price));

  const mainImage = property.images?.[0] || null;

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200" data-testid={`property-card-${property.id}`}>
      <div className="relative aspect-[4/3] bg-muted">
        {mainImage ? (
          <img
            src={mainImage}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <MapPin className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
        
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge
            className={`${statusColors[property.status || "available"]} border-0`}
          >
            {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
          </Badge>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/90 dark:bg-black/50 backdrop-blur-sm"
            data-testid={`property-favorite-${property.id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/90 dark:bg-black/50 backdrop-blur-sm text-xs">
            {propertyTypeLabels[property.propertyType || "house"]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" data-testid={`property-title-${property.id}`}>
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{property.address}, {property.city}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`property-menu-${property.id}`}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(property.id)}>
                Edit Property
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(property.id)}
                className="text-destructive"
              >
                Delete Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary tabular-nums" data-testid={`property-price-${property.id}`}>
            {formattedPrice}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span className="text-xs tabular-nums">{property.views || 0} views</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} beds</span>
            </div>
          )}
          {property.bathrooms !== null && (
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>
          )}
          {property.squareFeet && (
            <div className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full" data-testid={`property-view-${property.id}`}>
              View Details
            </Button>
          </Link>
          <Button variant="default" className="flex-1" data-testid={`property-contact-${property.id}`}>
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
