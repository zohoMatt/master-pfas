import * as React from 'react';
import classnames from 'classnames';
import { Input, message, Popconfirm, Table } from 'antd';

import { FullRecordType, Params } from '../../store/types';
import { WaterParams } from '../../store/water.store';

const styles = require('./RecordList.module.less');

export interface RecordListProps {
    database: FullRecordType<WaterParams>[];
    disabled: boolean;
    toView: (key: string) => any;
    toDelete: (key: string) => any;
}

const RecordList: React.FunctionComponent<RecordListProps> = ({
    database,
    disabled,
    toView,
    toDelete
}) => {
    const [search, setSearch] = React.useState('');

    const TITLE = 'Are you sure to DELETE this entry?';

    const viewIt = (record: FullRecordType<WaterParams>) => (e: any) => {
        if (warning()) return;
        toView(record.key);
    };
    const deleteIt = (record: FullRecordType<WaterParams>) => (e: any) => {
        toDelete(record.key);
    };

    const warning = (): boolean => {
        if (disabled) {
            message.warning('Please saving or cancelling current edition first.');
            return true;
        }
        return false;
    };

    const COLUMNS = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            colSpan: 1
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: FullRecordType<WaterParams>) => {
                return (
                    <span>
                        <a
                            className={classnames({
                                [styles.leftLink]: true,
                                [styles.linkDisabled]: disabled
                            })}
                            onClick={viewIt(record)}>
                            View
                        </a>
                        <Popconfirm
                            placement="right"
                            disabled={disabled}
                            title={TITLE}
                            onConfirm={deleteIt(record)}
                            okText="Yes"
                            cancelText="No">
                            <a
                                className={classnames({
                                    [styles.linkDisabled]: disabled
                                })}
                                onClick={warning}>
                                Delete
                            </a>
                        </Popconfirm>
                    </span>
                );
            }
        }
    ];

    const filteredData = database.filter(
        r =>
            r.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            r.description.toLowerCase().indexOf(search) !== -1
    );
    return (
        <>
            <div className={styles.inputPanel}>
                <Input.Search
                    placeholder="Search here..."
                    allowClear={true}
                    onSearch={setSearch}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 200 }}
                    />
            </div>
            <Table
                style={{ height: '100%' }}
                dataSource={filteredData}
                columns={COLUMNS}
                size="small"
                />
        </>
    );
};

export { RecordList };
