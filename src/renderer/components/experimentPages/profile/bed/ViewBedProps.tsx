import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Descriptions } from 'antd';

import { Calculation } from '../../../../../mods/calculation/basic';
import { StoreInjectedProp } from '../../../../store';
import { NAV_KEYS, ITEM_KEYS } from '../../../nav/NavBar';
import { AdsorbentData, BedInputParams } from '../../../../../utils/storage/types';

export const ViewBedProps: React.FunctionComponent<BedInputParams & StoreInjectedProp> = inject(
    'store'
)(
    observer(props => {
        // Hooks
        const [adsorbentData, setAdsorbent] = React.useState({} as AdsorbentData);
        React.useEffect(() => {
            props
                .store!.adsorbent.tableList()
                .then(list => list.find((r: AdsorbentData) => r.key === adsorbent))
                .then(v => v && setAdsorbent(v));
        });

        const { adsorbent, length, diameter, mass, flowrate } = props;
        const { display: d } = Calculation;

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Adsorbent" span={3}>
                        {adsorbentData.name ? (
                            <Link
                                to={`/workspace/${NAV_KEYS.Database}/${ITEM_KEYS.Adsorbent}?key=${adsorbent}`}>
                                {adsorbentData.name}
                            </Link>
                        ) : (
                            'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Bed Length">{d(length)}</Descriptions.Item>
                    <Descriptions.Item label="Bed Diameter">{d(diameter)}</Descriptions.Item>
                    <Descriptions.Item label="Mass">{d(mass)}</Descriptions.Item>
                    <Descriptions.Item label="Flowrate">{d(flowrate)}</Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
