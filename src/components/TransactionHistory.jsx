import { useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient";
import { useAuth } from "../components/useAuth";
import generatePaymentInvoice from "../utils/generatePaymentInvoice";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const { user, role } = useAuth();

    useEffect(() => {
        if (user && role) {
            fetchTransactions();
        }
    }, [user, role]);

    const handleInvoiceDownload = (t) => {
        if (t.payment_status === "paid") {
            generatePaymentInvoice(t);
        } else if (
            t.payment_status === "refund initiated" ||
            t.payment_status === "refunded"
        ) {
            // Handle refund cases
        }
    };

    const fetchTransactions = async () => {
        if (!user) return;

        let query = supabase
            .from("appointments")
            .select(`
                id,
                payment_status,
                razorpay_payment_id,
                from_datetime,

                professionals (
                    full_name,
                    address,
                    city,
                    state,
                    pincode,
                    email,
                    phone
                ),

                patients (
                    full_name,
                    address,
                    city,
                    state,
                    pincode,
                    email,
                    phone
                )
            `)
            .in("payment_status", [
                "paid",
                "refund initiated",
                "refunded",
            ])
            .order("from_datetime", { ascending: false });

        // PATIENT VIEW
        if (role === "patient") {
            query = query.eq("patient_id", user.id);
        }

        // PROFESSIONAL VIEW
        if (role === "professional") {
            query = query.eq("professional_id", user.id);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Transaction fetch error:", error);
            return;
        }

        setTransactions(data || []);
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-semibold mb-4 text-blue">
                Transaction History
            </h3>

            {transactions.length === 0 ? (
                <p className="text-muted">No transactions found</p>
            ) : (
                <div className="table-responsive w-100">
                    <table className="table table-bordered mt-4">
                        <thead className="table-primary">
                            <tr>
                                {/* Dynamic Column */}
                                <th className="text-blue">
                                    {role === "patient"
                                        ? "Professional"
                                        : "Patient"}
                                </th>

                                <th className="text-blue">Date</th>

                                <th className="text-blue">
                                    Payment ID
                                </th>

                                <th className="text-blue">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id}>
                                    {/* Dynamic Name */}
                                    <td>
                                        {role === "patient"
                                            ? t.professionals?.full_name
                                            : t.patients?.full_name}
                                    </td>

                                    <td>
                                        {new Date(
                                            t.from_datetime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {t.razorpay_payment_id || "-"}
                                    </td>

                                    <td>
                                        <span
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                handleInvoiceDownload(t)
                                            }
                                        >
                                            {t.payment_status ===
                                                "paid" && (
                                                    <span className="badge bg-success">
                                                        Paid
                                                    </span>
                                                )}

                                            {t.payment_status ===
                                                "refund initiated" && (
                                                    <span className="badge bg-warning text-dark">
                                                        Refund Initiated
                                                    </span>
                                                )}

                                            {t.payment_status ===
                                                "refunded" && (
                                                    <span className="badge bg-info text-white">
                                                        Refunded
                                                    </span>
                                                )}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;