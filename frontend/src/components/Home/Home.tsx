import React from "react";
import Layout from "../Layout";
import { Table, Button, Select } from "semantic-ui-react";
import { getInvoicesAction } from "../../redux/Actions/InvoiceAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CreateInvoice from "./CreateInvoice";
import { setAction } from "../../redux/Slices/InvoiceSlice";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = React.useState();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => ({
    invoices: state.invoices.getInvoices,
    loading: state.invoices.getInvoicesLoading,
    action: state.invoices.action,
    add: state.invoices.createInvoice,
  }));
  const { loading, invoices, action, add } = selector;

  const toggleModal = () => {
    setOpen(!open);
  };

  const changeStatus = (value?: any) => {
    setStatus(value);
  };

  const toggleSort = () => {
    getInvoicesAction(status)(dispatch);
  };

  React.useEffect(() => {
    getInvoicesAction()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (action && add) {
      dispatch(setAction(false));
      getInvoicesAction()(dispatch);
    }
  }, [action, dispatch, add]);

  return (
    <Layout>
      {open && <CreateInvoice open={open} onClose={toggleModal} />}
      <div className="invoices">
        {loading && <div style={{ fontWeight: "bold" }}>Loading ...</div>}
        {invoices && !loading && (
          <div className="list">
            <div className="header">
              <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
                List Of Invoices
              </div>
              <div className="list-right">
                <div className="custom-select">
                  <Select
                    placeholder="Sort By Status"
                    options={[
                      { key: "paid", value: "paid", text: "Paid" },
                      {
                        key: "outstanding",
                        value: "outstanding",
                        text: "Outstanding",
                      },
                      {
                        key: "rate",
                        value: "rate",
                        text: "Rate",
                      },
                    ]}
                    clearable
                    value={status}
                    onChange={(e, data) => changeStatus(data.value)}
                  ></Select>
                  <Button type="button" onClick={toggleSort}>
                    Sort
                  </Button>
                </div>
                <Button type="button" onClick={toggleModal}>
                  Create An Invoice
                </Button>
              </div>
            </div>
            <div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Hours Of Work</Table.HeaderCell>
                    <Table.HeaderCell>Rate</Table.HeaderCell>
                    <Table.HeaderCell>Total Amount</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {invoices.length > 0 && (
                    <>
                      {invoices.map((item: any) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.title}</Table.Cell>
                          <Table.Cell>{item.hoursOfWork}</Table.Cell>
                          <Table.Cell>{item.rate}</Table.Cell>
                          <Table.Cell>{item.totalAmount}</Table.Cell>
                          <Table.Cell>{item.description}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                        </Table.Row>
                      ))}
                    </>
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Home;
