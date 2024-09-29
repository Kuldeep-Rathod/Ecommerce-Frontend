import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "0123456789";
const allSymbols = "@#$&%";

const Coupon = () => {
    const [size, setSize] = useState<number>(6);
    const [coupon, setCoupon] = useState<string>("");
    const [prefix, setPrefix] = useState<string>("");
    const [includeCharecters, setIncludeCharacters] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyText =async (coupon: string) => {
      await navigator.clipboard.writeText(coupon);
      setIsCopied(true);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !prefix &&
            !includeCharecters &&
            !includeNumbers &&
            !includeSymbols
        ) {
            return alert("Please enter coupon details");
        }

        let result: string = prefix || "";
        const loopLength = size - prefix.length;

        for (let i = 0; i < loopLength; i++) {
            let entireString = "";

            if (includeCharecters) entireString += allLetters;
            if (includeNumbers) entireString += allNumbers;
            if (includeSymbols) entireString += allSymbols;

            const randomNumber = Math.floor(
                Math.random() * entireString.length
            );

            result += entireString[randomNumber];
        }

        setCoupon(result);
    };

    useEffect(() => {
      setIsCopied(false);
    }, [coupon]);

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="dashboardAppContainer">
                <h1>Coupon</h1>
                <section>
                    <form className="couponForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={prefix}
                            placeholder="Text Prefix"
                            maxLength={size}
                            onChange={(e) =>
                                setPrefix(
                                    e.target.value
                                        .toUpperCase()
                                        .replace(/\s/g, "")
                                )
                            }
                        />
                        <input
                            type="number"
                            value={size}
                            placeholder="Coupon Length"
                            min={6}
                            max={25}
                            onChange={(e) => setSize(Number(e.target.value))}
                        />
                        <fieldset>
                            <legend>Include</legend>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() =>
                                    setIncludeNumbers((prev) => !prev)
                                }
                            />
                            <span>Number</span>

                            <input
                                type="checkbox"
                                checked={includeCharecters}
                                onChange={() =>
                                    setIncludeCharacters((prev) => !prev)
                                }
                            />
                            <span>Characters</span>

                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() =>
                                    setIncludeSymbols((prev) => !prev)
                                }
                            />
                            <span>Symbols</span>
                        </fieldset>
                        <button type="submit">Generate</button>
                    </form>

                    {coupon && (
                        <code>
                            {coupon}{" "}
                            <span onClick={() => copyText(coupon)}>
                                {isCopied ? "Copied" : "Copy"}
                            </span>
                        </code>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Coupon;
