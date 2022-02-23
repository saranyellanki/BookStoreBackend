import CustomerDetails from '../models/customer.model';

export const customerDetails = async (req) => {
  const data = await CustomerDetails.create(req.body);
  return data;
}