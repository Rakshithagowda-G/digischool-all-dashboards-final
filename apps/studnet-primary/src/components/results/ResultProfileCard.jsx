import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

function ResultProfileCard({ title, description, info, social, avatar }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <Box
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      sx={{
        fontSize: "20px",
        color: "white",
        pr: 1,
        pl: 0.5,
        lineHeight: 1,
        textDecoration: "none",
      }}
    >
      {icon}
    </Box>
  ));

  return (
    <Card
      sx={{
        height: "100%",
        padding: '8px',
        background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        borderRadius: "24px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Box display="flex" mb="20px" justifyContent="space-between" alignItems="center">
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            color: "white", 
            textTransform: "capitalize",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {title}
        </Typography>
      </Box>
      {avatar && (
        <Box mb={3} display="flex" justifyContent="center">
          <Avatar
            src={avatar}
            alt="profile-image"
            variant="rounded"
            sx={{
              width: 96,
              height: 96,
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>
      )}
      <Box>
        {description && (
          <>
            <Box mb={3} sx={{ lineHeight: 1.6 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.7)", 
                  fontWeight: "regular", 
                  fontSize: "14px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {description}
              </Typography>
            </Box>
            <Box sx={{ opacity: 0.3, mb: 3 }}>
              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
            </Box>
          </>
        )}
        <Box>
          {labels.map((label, key) => (
            <Box
              key={label}
              mb={2.5}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '14px 16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "medium",
                  textTransform: "capitalize",
                  fontSize: '11px',
                  marginBottom: '4px',
                  display: 'block',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="medium"
                sx={{
                  color: "white",
                  fontSize: '14px',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {values[key]}
              </Typography>
            </Box>
          ))}
          <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            mt={3}
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '14px 16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              variant="caption"
              fontWeight="medium"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textTransform: "capitalize",
                fontSize: '11px',
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Social:
            </Typography>
            <Box display="flex" gap={1}>
              {renderSocial}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the ResultProfileCard
ResultProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  avatar: PropTypes.string,
};

export default ResultProfileCard;
