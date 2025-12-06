/// <reference types="@testing-library/jest-dom" />

import "@testing-library/jest-dom";
import { TextEncoder } from "util";

global.TextEncoder = TextEncoder;
