import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme is React version agnostic and can work with any version through
// adapters system. Enzyme Adapter is a sort of engine that knows how to
// manipulate underlying UI library (it can be used not only with React).
// Since we use React 16, we need to set a proper adapter.
configure({ adapter: new Adapter() });
