"use client";

import { Button } from "./kit/Button";
import Calendar from "./kit/Calendar";
import Checkbox from "./kit/Checkbox";
import Input from "./kit/Input";
import { Linker } from "./kit/Link";
import Skeleton from "./kit/Skeleton";
import Select from "./kit/Select";
import TextArea from "./kit/TextArea";

// import { buildAppUi } from "./buildAppUi";

// export { Card, CardItem, CardItemRow } from "@/shared/ui/kit/Card";
// export type { CreateDocumentGuideItem, CreateDocumentItem } from "@/shared/config/guideList";

// const UI = buildAppUi();
const KIT = {
    Skeleton,
    Button,
    Calendar,
    Input,
    Checkbox,
    Select,
    TextArea,
    Linker,
};

const COMPOSED = {};

const UI = {
    ...KIT,
    ...COMPOSED,
};

export default UI;
