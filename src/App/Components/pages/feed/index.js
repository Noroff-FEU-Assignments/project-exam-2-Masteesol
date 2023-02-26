import Main from "./feed-main.js";
import { SelectContentProvider } from "./context/ContentContext.js";
export default () => {
  return (
    <SelectContentProvider>
      <Main></Main>
    </SelectContentProvider>
  );
};
