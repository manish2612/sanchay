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
  Button,
  Icon
} from "@prime/ui";

export const AutoSuggestCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig, features } = column.columnDef.meta || {};
  const { placeholder = "Search item...", disabled: disabledConfig } = inputConfig || {};
  const { enableLineDetails } = features || {};
  
  const isDisabled = typeof disabledConfig === 'function' ? disabledConfig(row) : disabledConfig;

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
  };

  const targetKey = inputConfig?.optionsKey || column.id;
  let dynamicOptions = meta?.options?.[targetKey] || [];

  if (inputConfig?.optionsFilter) {
    dynamicOptions = dynamicOptions.filter((opt: any) => inputConfig.optionsFilter(opt, row.original));
  }

  const filteredOptions = dynamicOptions.filter((item: any) =>
    item.label.toLowerCase().includes((value || "").toLowerCase())
  );

  return (
    <>
      <AutoSuggest
        inputValue={value}
        onInputChange={(val) => {
          setValue(val);
          updateData?.(row.index, column.id, val);

          if (inputConfig?.idKey) {
            const matchedOption = dynamicOptions.find(
              (opt: any) => opt.value === val || opt.label === val
            );
            updateData?.(row.index, inputConfig.idKey, matchedOption?.id || "");
          }
        }}
        options={filteredOptions}
        creatable
      onCreate={() => {
        if (inputConfig?.onCreate) {
          inputConfig.onCreate(value);
        } else {
          setIsModalOpen(true);
        }
      }}
    >
      <AutoSuggest.Input
        placeholder={placeholder}
        disabled={isDisabled}
        error={!!error}
        className="h-8 !min-h-8 !py-0 w-full my-auto bg-surface transition-all"
        inputClassName="text-sm h-full px-1"
        onBlur={onBlur}
        rightSlot={
          enableLineDetails ? (
            <Button
              type="button"
              variant="ghost"
              disabled={!value || value.trim() === ""}
              className={`h-6 w-6 !p-0 mr-1 transition-colors ${
                !value || value.trim() === ""
                  ? "opacity-50 text-muted-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (value && value.trim() !== "") {
                  actions?.openLineDetails?.(row.index);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  if (value && value.trim() !== "") {
                    actions?.openLineDetails?.(row.index);
                  }
                }
              }}
              title="Add/Edit Description"
            >
              <Icon 
                name={row.original.description ? "MessageCircleCheck" : "MessageCircle"} 
                size={16} 
                className={row.original.description ? "text-primary" : ""}
              />
            </Button>
          ) : undefined
        }
      />
      <AutoSuggest.Content>
        <AutoSuggest.List>
          <AutoSuggest.Empty>No items found.</AutoSuggest.Empty>
          {filteredOptions.map((opt: any) => (
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
