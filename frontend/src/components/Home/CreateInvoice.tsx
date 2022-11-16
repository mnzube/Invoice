import React from "react";
import { Modal, Button, Input, TextArea } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createInvoicesAction } from "../../redux/Actions/InvoiceAction";

const CreateInvoice = ({ open, onClose }: any) => {
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    hoursOfWork: "",
    rate: "",
    status: "",
  });

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => ({
    loading: state.invoices.createInvoiceLoading,
    success: state.invoices.createInvoice,
    action: state.invoices.action,
  }));

  const { loading, success, action } = selector;

  const onSubmit = (e: any) => {
    e.preventDefault();
    createInvoicesAction(values)(dispatch);
  };

  React.useEffect(() => {
    if (success && action) {
      onClose();
    }
  }, [success, action, onClose]);

  return (
    <Modal open={open} onClose={onClose} style={{ width: "600px" }}>
      <Modal.Header>Create Invoice</Modal.Header>
      <Modal.Content>
        <div className="create-invoice-form">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="group">
              <Input
                type="text"
                name="title"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Title"
                className="auth-input"
                required
              />
            </div>
            <div className="group">
              <Input
                type="number"
                name="hoursOfWork"
                value={values.hoursOfWork}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Hours Of Work"
                className="auth-input"
                required
              />
            </div>
            <div className="group">
              <Input
                type="number"
                name="rate"
                value={values.rate}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Rate"
                className="auth-input"
                required
              />
            </div>
            <div className="group">
              <Input
                type="text"
                name="status"
                value={values.status}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Status"
                className="auth-input"
                required
              />
            </div>
            <div className="group">
              <TextArea
                name="description"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="auth-input"
                placeholder="Notes"
              ></TextArea>
            </div>
            <div className="group">
              <Button type="submit" primary disabled={loading}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default CreateInvoice;
