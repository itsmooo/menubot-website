import React, { useEffect } from 'react';

import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { Order } from '@/lib/services/orderService';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export const OrderList = () => {
  const { data: orders = [], isLoading, isError, error } = useOrders();

  // Add debugging
  useEffect(() => {
    console.log('Raw orders data:', orders);
  }, [orders]);

  if (isLoading) {
    return <div className="flex justify-center p-4 text-black">Loading orders...</div>;
  }

  if (isError) {
    return <div className="text-red-500 p-4">Error loading orders: {error?.message}</div>;
  }

  console.log('Orders data:', orders); // Add this to debug

  return (
    <div className="container mx-auto py-10">
      <Table>
         <TableHeader>
          <TableRow key="header">
            <TableHead className="text-black">Message</TableHead>
            <TableHead className="text-black">Response</TableHead>
            <TableHead className="text-black">Timestamp</TableHead>
            <TableHead className="text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow key={`${order._id}-${index}`}>
                <TableCell className="text-black whitespace-normal break-words max-w-[200px]">
                  {order?.message || 'No message'}
                </TableCell>
                <TableCell className="text-black whitespace-normal break-words max-w-[200px]">
                  {order?.response || 'No response'}
                </TableCell>
                <TableCell className="text-black">
                  {order?.timestamp && format(new Date(order.timestamp), 'MMM dd, yyyy, h:mm a')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => {/* handle delete */}}
                    className="mr-2"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="no-data">
              <TableCell colSpan={4} className="text-center py-4 text-black">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};