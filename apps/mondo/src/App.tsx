import { AppContainer } from 'codefee-kit';
import Routes from './Routes';
import 'index.scss';
import { Button, Stack, Chip } from 'ui';

const App = () => {
  return (
    <AppContainer>
      <Button>Test</Button>
      <Stack direction="row" spacing={1}>
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
      </Stack>
      <Routes />
    </AppContainer>
  );
};

export default App;
