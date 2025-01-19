/*
  Warnings:

  - You are about to drop the column `order_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `card_type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_email` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_four_digits` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_order_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "order_id",
ADD COLUMN     "card_type" "CardType" NOT NULL,
ADD COLUMN     "customer_email" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "last_four_digits" TEXT NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderDetail";

-- DropTable
DROP TABLE "Payment";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
