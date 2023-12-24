'use client';

import {Box, Typography} from '@mui/material';

const Header = () => {
  return (
    <Box sx={{mt: 4}}>
      <Typography variant="h4" component="h1" sx={{fontWeight: 600}} align="center">
        My ParfStore
      </Typography>
      <Typography variant="h5" component="h2" sx={{fontWeight: 600}} align="center">
        Оригинальная парфюмерия по&nbsp;лучшим&nbsp;ценам
      </Typography>
      <Typography variant="body1" align="center" sx={{mt: 3}} gutterBottom>
        Никаких сказок про экономию на аренде и консультантах.
      </Typography>
      <Typography variant="body1" component="div" align="center">
        Я просто делаю минимально возможную наценку,
        <br />
        чтобы хоть как-то конкурировать с крупными сетями 🙂
      </Typography>
    </Box>
  );
};

export default Header;
