import ImagePickerDemo from "./image-picker-demo";
import { useScreenBrightness } from "../hooks/useScreenBrightness";

export default function Home() {
  useScreenBrightness();
  return <ImagePickerDemo />;
}
