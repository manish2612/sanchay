import React, { useEffect, useState } from "react";
import { 
  AutoSuggest,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  Button
} from "@prime/ui";

export const AutoSuggestCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig } = column.columnDef.meta || {};
  const { placeholder = "Search item..." } = inputConfig || {};

  const meta = table.options.meta || {} as any;
  const { state, actions } = meta;
  const rowError = meta?.rowErrors?.[row.index] || state?.rowErrors?.[row.index];
  const error = typeof rowError === 'object' && rowError !== null ? rowError[column.id] : rowError;
  const updateData = meta?.updateData || actions?.updateData;
  const onRowCommit = meta?.onRowCommit || actions?.onRowCommit;

  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData?.(row.index, column.id, value);
    if (value && value.trim() !== "") {
      onRowCommit?.(row.index, column.id, value);
    }
  };
  const MOCK_ITEMS = [
    { label: "MacBook Pro 16", value: "MacBook Pro 16" },
    { label: "iPhone 15 Pro", value: "iPhone 15 Pro" },
    { label: "Magic Keyboard", value: "Magic Keyboard" },
    { label: "AirPods Pro", value: "AirPods Pro" },
    { label: "iPad Air", value: "iPad Air" },
  ];

  const filteredOptions = MOCK_ITEMS.filter((item) =>
    item.label.toLowerCase().includes((value || "").toLowerCase())
  );

  return (
    <>
      <AutoSuggest
        inputValue={value}
      onInputChange={(val) => {
        setValue(val);
        updateData?.(row.index, column.id, val);
        if (val && val.trim() !== "") {
          onRowCommit?.(row.index, column.id, val);
        }
      }}
      options={filteredOptions}
      creatable
      onCreate={() => {
        setIsModalOpen(true);
      }}
    >
      <AutoSuggest.Input
        placeholder={placeholder}
        error={!!error}
        className="h-8 !min-h-8 !py-0 w-full my-auto bg-surface transition-all"
        inputClassName="text-sm h-full px-1"
        onBlur={onBlur}
      />
      <AutoSuggest.Content>
        <AutoSuggest.List>
          <AutoSuggest.Empty>No items found.</AutoSuggest.Empty>
          {filteredOptions.map((opt) => (
            <AutoSuggest.Item key={opt.value} value={opt.value}>
              {opt.label}
            </AutoSuggest.Item>
          ))}
          <AutoSuggest.CreateItem createLabel="Create new item" />
        </AutoSuggest.List>
      </AutoSuggest.Content>
    </AutoSuggest>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Create New Item</ModalTitle>
            <ModalDescription>
              Enter the details for the new item.
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">Dummy form fields go here...</p>
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="ghost">Cancel</Button>
            </ModalClose>
            <Button onClick={() => setIsModalOpen(false)}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
