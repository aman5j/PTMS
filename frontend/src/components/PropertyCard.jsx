import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices"; // Adjust as needed

function capitalizeWords(str) {
  if (!str) return "-";
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

const PropertyCard = ({ property }) => (
  <Card variant="outlined" sx={{ width: 320, m: 1 }}>
    {property.frontView && (
      <CardMedia
        component="img"
        height="140"
        image={`${serverURL}/images/${property.frontView}`}
        alt="Front View"
      />
    )}
    <CardContent>
      <Typography variant="h6" noWrap>
        {capitalizeWords(property.ownerName)}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap>
        {property.propertyAddress}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Zone: {capitalizeWords(property.zone)} | Ward: {capitalizeWords(property.ward)} | Mohalla: {capitalizeWords(property.mohalla)}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
        Usage: {capitalizeWords(property.houseUsage)} | Ownership: {capitalizeWords(property.ownershipStatus)}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
        Constructed: {property.constructionYear || "-"}
      </Typography>
      <Box mt={1}>
        <Typography variant="caption" color={property.sewerConnection ? "green" : "textSecondary"}>
          Sewer Connection: {property.sewerConnection ? "Yes" : "No"}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default PropertyCard;
