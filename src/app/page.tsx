import * as fs from 'fs';
import os from 'os';
import * as path from 'path';

import {Content} from '@/components/pages/Main';

import {getPerfumes} from '@/services/api';

const Main = async () => {
  const perfumes = await getPerfumes();

  return <Content perfumes={perfumes} />;
};

export default Main;
