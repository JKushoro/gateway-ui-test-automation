// ui/helpers/RowMatcherHelper.ts
import { Locator } from "@playwright/test";
import { ElementHelper } from "./ElementHelper";
import { equalsIgnoreCase } from "../../utils/stringUtils";

export class RowMatcherHelper {
    /**
     * Finds a row matching a single or pair of cell values.
     */
    public static async findRowByCellValues(params: {
        rows: Locator;
        getNameLocator: (row: Locator) => Locator;
        getSubjectLocator?: (row: Locator) => Locator;
        expectedName: string;
        expectedSubject?: string;
    }): Promise<Locator | null> {
        const { rows, getNameLocator, getSubjectLocator, expectedName, expectedSubject } = params;
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const name = await ElementHelper.getTrimmedText(getNameLocator(row));
            const nameMatches = equalsIgnoreCase(name, expectedName);

            if (expectedSubject && getSubjectLocator) {
                const subject = await ElementHelper.getTrimmedText(getSubjectLocator(row));
                const subjectMatches = equalsIgnoreCase(subject, expectedSubject);

                if (nameMatches && subjectMatches) return row;
            } else {
                if (nameMatches) return row;
            }
        }

        return null;
    }
}
