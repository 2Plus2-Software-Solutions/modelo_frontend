import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { Payment } from "../columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyMask } from "@/lib/masks/currency-mask";
import api from "@/services/api";

const editPaymentSchema = z.object({
  id: z.string(),
  amount: z.string(),
  email: z.string().email(),
});

interface UpdatePaymentProps {
  payment: Payment;
}

export function UpdatePayment({ payment }: UpdatePaymentProps) {
  const form = useForm<z.infer<typeof editPaymentSchema>>({
    resolver: zodResolver(editPaymentSchema),
    defaultValues: {
      amount: CurrencyMask(payment.amount?.toString()),
      email: payment.email,
    },
  });

  async function onSubmit(values: z.infer<typeof editPaymentSchema>) {
    console.log(values);

    // const response = await api.put(`/payment/${values.id}`, {
    //   values,
    // });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-1 h-auto">
          <Edit2 height={12} width={12} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Editar pagamento "{payment.id}"</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Valor"
                      {...field}
                      onChange={(event) =>
                        field.onChange(CurrencyMask(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Salvar alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
