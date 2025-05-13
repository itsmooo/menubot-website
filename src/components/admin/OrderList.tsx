import React, { useEffect } from "react";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/lib/services/orderService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Trash2, RefreshCcw, Filter } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const OrderList = () => {
  const { data: orders = [], isLoading, isError, error } = useOrders();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Navbar Section */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Order History
            </h2>
            <p className="text-orange-100">
              Manage and track all customer orders
            </p>

            {/* Stats and Actions Row */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-orange-100 text-sm">Total Orders</p>
                  <p className="text-white text-2xl font-bold">
                    {orders.length}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="p-6 bg-red-50 m-4 rounded-lg border border-red-100">
              <p className="text-red-600 text-center">{error?.message}</p>
            </div>
          )}

          {/* Table Section */}
          {!isLoading && !isError && (
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50/50">
                    <TableHead className="text-orange-950 font-semibold">
                      Message
                    </TableHead>
                    <TableHead className="text-orange-950 font-semibold">
                      Response
                    </TableHead>
                    <TableHead className="text-orange-950 font-semibold">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-orange-950 font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <TableRow
                        key={`${order._id}-${index}`}
                        className="hover:bg-orange-50/50 transition-colors"
                      >
                        <TableCell className="text-gray-700 whitespace-normal break-words max-w-[300px] py-4">
                          {order?.message || "No message"}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-normal break-words max-w-[300px] py-4">
                          {order?.response || "No response"}
                        </TableCell>
                        <TableCell className="text-gray-600 py-4">
                          <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                            {format(
                              new Date(order.timestamp),
                              "MMM dd, yyyy, h:mm a"
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              /* handle delete */
                            }}
                            className="hover:bg-red-100 hover:text-red-600 transition-colors rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-orange-100 p-3 rounded-full">
                            <Filter className="h-6 w-6 text-orange-600" />
                          </div>
                          <p className="text-lg font-medium text-gray-700">
                            No orders found
                          </p>
                          <p className="text-sm text-gray-500">
                            Orders will appear here once customers start placing
                            them
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};
