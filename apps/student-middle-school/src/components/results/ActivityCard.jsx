/**
 * Result dashboard GPA/grade card with hover animation.
 */
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

const StyledWrapper = styled.div`
  .card {
    --primary-clr: ${props => props.isDarkMode ? '#1c204b' : '#ffffff'};
    --dot-clr: ${props => props.isDarkMode ? '#bbc0ff' : '#6366f1'};
    --text-clr: ${props => props.isDarkMode ? '#fff' : '#1c204b'};
    --subtitle-clr: ${props => props.isDarkMode ? 'rgba(255,255,255,0.75)' : 'rgba(28,32,75,0.7)'};
    width: 100%;
    max-width: 100%;
    height: 170px;
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
    color: var(--text-clr);
    display: grid;
    cursor: pointer;
    grid-template-rows: 50px 1fr;
  }

  /* iPad Pro responsive styles (1024px-1366px) */
  @media (min-width: 1024px) and (max-width: 1366px) {
    .card {
      height: 150px;
      grid-template-rows: 45px 1fr;
    }

    .card-desc {
      padding: 12px !important;
      top: -8px !important;
    }

    .card-time {
      font-size: 1.5em !important;
    }

    .card-title {
      font-size: 0.8em !important;
    }

    .card .recent {
      font-size: 0.75em !important;
    }

    .card svg {
      max-width: 70px !important;
      max-height: 70px !important;
    }
  }

  /* Desktop restoration (above 1366px) */
  @media (min-width: 1367px) {
    .card {
      height: 170px;
      grid-template-rows: 50px 1fr;
    }

    .card-desc {
      padding: 15px !important;
      top: -10px !important;
    }

    .card-time {
      font-size: 1.7em !important;
    }

    .card-title {
      font-size: 0.9em !important;
    }

    .card .recent {
      font-size: 0.8em !important;
    }

    .card svg {
      max-width: 100% !important;
      max-height: 100% !important;
    }
  }

  .card:hover .img-section {
    transform: translateY(1em);
  }

  .card-desc {
    border-radius: 20px;
    padding: 15px;
    position: relative;
    top: -10px;
    display: grid;
    gap: 10px;
    background: var(--primary-clr);
    box-shadow: ${props => props.isDarkMode ? '0 12px 30px rgba(0, 0, 0, 0.35)' : '0 12px 30px rgba(0, 0, 0, 0.1)'};
    border: ${props => props.isDarkMode ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};
  }

  .card-time {
    font-size: 1.7em;
    font-weight: 600;
    color: var(--text-clr);
    font-family: "Poppins", sans-serif;
  }

  .img-section {
    transition: 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: ${props => props.isDarkMode ? 'linear-gradient(135deg, #0075ff, #4318ff)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
    display: flex;
    align-items: center;
    justifyContent: center;
  }
  
  .card .recent {
    color: var(--subtitle-clr);
    font-family: "Poppins", sans-serif;
  }

  .card-header {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .card-title {
    flex: 1;
    font-size: 0.9em;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: "Poppins", sans-serif;
  }

  .card-menu {
    display: flex;
    gap: 4px;
    margin-inline: auto;
  }

  .card svg {
    max-width: 100%;
    max-height: 100%;
  }

  .card .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--dot-clr);
  }

  .card .recent {
    line-height: 1.2;
    font-size: 0.8em;
    opacity: 0.75;
  }
`;

const cardData = [
  {
    title: "Current GPA",
    value: "3.85",
    subtitle: "Overall cumulative GPA",
  },
  {
    title: "Semester GPA",
    value: "3.91",
    subtitle: "Fall 2025 Semester",
  },
  {
    title: "Overall Grade",
    value: "A",
    subtitle: "Based on final results",
  },
];

function ActivityCard({ index = 0, value, label }) {
  const data = cardData[index] || cardData[0];
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const displayValue = value !== undefined ? value : data.value;
  const displayTitle = label !== undefined ? label : data.title;

  return (
    <StyledWrapper isDarkMode={isDarkMode}>
      <div className="card work">
        <div className="img-section">
          <svg xmlns="http://www.w3.org/2000/svg" height={77} width={76}>
            <path
              fillRule="nonzero"
              fill="#3F9CBB"
              d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
            />
          </svg>
        </div>
        <div className="card-desc">
          <div className="card-header">
            <div className="card-title">{displayTitle}</div>
            <div className="card-menu">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
          <div className="card-time">{displayValue}</div>
          <p className="recent">{data.subtitle}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

ActivityCard.propTypes = {
  index: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

export default ActivityCard;
