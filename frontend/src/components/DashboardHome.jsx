import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import PropertyCard from "./PropertyCard"; // your card component


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardHome = ({ properties, users }) => {
  // Aggregate stats
  const totalProperties = properties.length;
  const totalUsers = users.length;

  const ownershipStatusCounts = properties.reduce((acc, prop) => {
    acc[prop.ownershipStatus] = (acc[prop.ownershipStatus] || 0) + 1;
    return acc;
  }, {});

  const houseUsageCounts = properties.reduce((acc, prop) => {
    acc[prop.houseUsage] = (acc[prop.houseUsage] || 0) + 1;
    return acc;
  }, {});

  // Convert ownershipStatusCounts to pie chart data format
  const ownershipData = Object.entries(ownershipStatusCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Convert houseUsageCounts similarly
  const usageData = Object.entries(houseUsageCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Get recently added properties (assuming createdAt exists or use _id timestamp)
  const recentProperties = properties.slice(-5).reverse();

  // Get recent users (last 5)
  const recentUsers = users.slice(-5).reverse();

  return (
    <Grid container spacing={3}>
      {/* Summary Cards */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Properties</Typography>
            <Typography variant="h4">{totalProperties}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Ownership Status Pie Chart */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Ownership Status</Typography>
            <PieChart width={200} height={200}>
              <Pie data={ownershipData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {ownershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      {/* House Usage Pie Chart */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>House Usage</Typography>
            <PieChart width={200} height={200}>
              <Pie data={usageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Properties */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Recently Added Properties</Typography>
            <List>
              {recentProperties.map((p) => (
                <ListItem key={p._id.$oid}>
                  <ListItemText
                    primary={`${p.ownerName} - ${p.propertyAddress}`}
                    secondary={`Floors: ${p.floorsData.length}, Usage: ${p.houseUsage}`}
                  />
                </ListItem>
              ))}
              {recentProperties.length === 0 && <Typography>No recent properties.</Typography>}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Users */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Recent User Registrations</Typography>
            <List>
              {recentUsers.map((user) => (
                <ListItem key={user._id.$oid}>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              ))}
              {recentUsers.length === 0 && <Typography>No recent users.</Typography>}
            </List>
          </CardContent>
        </Card>
      </Grid>


      {/* {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property._id.$oid}>
          <PropertyCard property={property} />
        </Grid>
      ))} */}


    </Grid>
  );
};

export default DashboardHome;