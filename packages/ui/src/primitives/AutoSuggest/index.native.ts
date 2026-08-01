export * from "./types";
import {
  AutoSuggestRoot,
  AutoSuggestInput,
  AutoSuggestContent,
  AutoSuggestList,
  AutoSuggestEmpty,
  AutoSuggestGroup,
  AutoSuggestItem,
  AutoSuggestCreateItem,
  AutoSuggestVirtualizedList,
} from "./AutoSuggest.native";

export const AutoSuggest = Object.assign(AutoSuggestRoot, {
  Input: AutoSuggestInput,
  Content: AutoSuggestContent,
  List: AutoSuggestList,
  Empty: AutoSuggestEmpty,
  Group: AutoSuggestGroup,
  Item: AutoSuggestItem,
  CreateItem: AutoSuggestCreateItem,
  VirtualizedList: AutoSuggestVirtualizedList,
});

