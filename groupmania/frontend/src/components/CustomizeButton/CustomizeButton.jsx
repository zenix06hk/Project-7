import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomizeButton = () => {
  styled(Button)({
    alignSelf: 'flex-end',
    marginTop: '20px',
    borderRadius: '8px',
    padding: '20px 50px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #ffdbdb',
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    minWidth: '120px',
    textTransform: 'none',
    '&:hover:not(:disabled)': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid #ffdbdb',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  });
};
export default CustomizeButton;
