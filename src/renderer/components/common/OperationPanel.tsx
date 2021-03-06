import * as React from 'react';
import { Button, Input, Popconfirm, Popover } from 'antd';

const styles = require('./OperationPanel.module.less');

export enum OperationPanelButtons {
    Edit,
    Save,
    SaveAs,
    Cancel
}

export interface OperationPanelProps {
    buttons: OperationPanelButtons[];
    saveDisabled?: boolean;
    saveAsDisabled?: boolean;
    warning?: boolean;
    onEdit: any;
    onSavedAs: any;
    onSave: any;
    onQuitCancel: any;
    onConfirmCancel: any;
    onTriggerCancel: any;
    onPopConfirmChange: any;
}

export interface OperationPanelState {
    inputNewName: string;
    saveAsPopover: boolean;
}

export class OperationPanel extends React.Component<OperationPanelProps> {
    public state: OperationPanelState = {
        inputNewName: '',
        saveAsPopover: false
    };

    public onChange = (e: any) => {
        this.setState({ inputNewName: e.target.value });
    };

    public whenSavedAs = () => {
        const { inputNewName } = this.state;
        this.props.onSavedAs(inputNewName);
        this.setState({ saveAsPopover: false });
    };

    public handlePopover = (status: boolean) => {
        this.setState({ saveAsPopover: status });
    };

    // fixme:ugly Only help clear pop-confirm
    public onPopConfirmChange = (status: boolean) => {
        if (!status) this.props.onPopConfirmChange(status);
    };

    public render() {
        const {
            buttons,
            saveDisabled,
            saveAsDisabled,
            warning,
            onEdit,
            onSave,
            onTriggerCancel,
            onQuitCancel,
            onConfirmCancel
        } = this.props;
        const { Edit, Save, SaveAs, Cancel } = OperationPanelButtons;
        const { inputNewName } = this.state;
        return (
            <div className={styles.btnPanel}>
                {buttons.includes(Edit) ? (
                    <Button type="primary" onClick={onEdit}>
                        Edit
                    </Button>
                ) : null}
                {buttons.includes(Save) ? (
                    <Button disabled={saveDisabled || false} type="primary" onClick={onSave}>
                        Save
                    </Button>
                ) : null}
                {buttons.includes(SaveAs) ? (
                    <Popover
                        content={
                            <div className={styles.saveAsPopover}>
                                <Input defaultValue={inputNewName} onChange={this.onChange} />
                                <a onClick={this.whenSavedAs}>Confirm</a>
                            </div>
                        }
                        title="New name..."
                        trigger="click"
                        visible={this.state.saveAsPopover}
                        onVisibleChange={this.handlePopover}>
                        <Button
                            type="primary"
                            disabled={saveAsDisabled || false}
                            onClick={() => this.handlePopover(true)}>
                            Save as
                        </Button>
                    </Popover>
                ) : null}
                {buttons.includes(Cancel) ? (
                    <Popconfirm
                        placement="left"
                        title="All unsaved changes will be lost. Sure to quit?"
                        visible={warning || false}
                        onConfirm={onConfirmCancel}
                        onCancel={onQuitCancel}
                        onVisibleChange={this.onPopConfirmChange}>
                        <Button danger onClick={onTriggerCancel}>
                            Cancel
                        </Button>
                    </Popconfirm>
                ) : null}
            </div>
        );
    }
}
