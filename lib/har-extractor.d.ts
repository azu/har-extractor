import { Har } from "har-format";
export interface ExtractOptions {
    outputDir: string;
    verbose?: boolean;
    dryRun?: boolean;
    removeQueryString?: boolean;
    pretty?: boolean;
}
export declare const extract: (harContent: Har, options: ExtractOptions) => void;
