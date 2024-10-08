import React, { FC } from "react";
import { ElementGroup, ElementStatus, ElementType, Events } from "../../utilities/Type";
import { getRoutineElementsByType, RoutineElement } from "../../utilities/RoutineUtil";
import { Element, CategorizedElements, getElementsByType } from "../../utilities/ElementUtil";
import RoutineRule from "./RoutineRule";

type SimpleTypeCountRuleProps = {
  elementStatus: ElementStatus;
  detailOpens: number[];
  setDetailOpens: React.Dispatch<React.SetStateAction<number[]>>;
  selectEvent: Events;
  showEvent: Events;
  routine: RoutineElement[];
  categorizedElements: CategorizedElements;
  title: string;
  targetElementType: ElementType;
  descriptionSentence: string;
};

const SimpleTypeCountRule: FC<SimpleTypeCountRuleProps> = ({
  elementStatus, // リンクする技の状態
  detailOpens,
  setDetailOpens,
  selectEvent, // 現在の種目
  showEvent, // このルールを表示する種目
  routine,
  categorizedElements,
  title, // ルールのタイトル
  targetElementType, // ルールの対象のElementType
  descriptionSentence, // ルールの説明文
}) => {
  if (selectEvent !== showEvent) {
    return null;
  }

  const limitCodes = getRoutineElementsByType(routine, [targetElementType]) as RoutineElement[];
  const typeElements = getElementsByType(selectEvent, targetElementType, categorizedElements);

  return (
    <RoutineRule
      detailOpens={detailOpens}
      setDetailOpens={setDetailOpens}
      elementStatus={elementStatus}
      summaryNode={
        <span className="rules__summary-title">
          {title}
          {limitCodes.length > 0 ? (
            <div className="rules__summary-labels">
              {limitCodes.map((row, index) => (
                <p key={index} className="common__label">
                  {row.code ? row.code : row.alias || row.name}
                </p>
              ))}
            </div>
          ) : null}
        </span>
      }
      descriptionNode={
        <div className="rules__description">
          <p>{descriptionSentence}</p>
          <table className="common__table">
            <tbody>
              {typeElements.map((element, index) => (
                <tr key={index} className="common__table-row">
                  {limitCodes.find((routineElement) => routineElement.id === element.id) ? (
                    <td className="common__table-cell common__table-cell--left common__table-cell--active">
                      {element.code && element.code + "."}
                      {element.alias || element.name} (選択中)
                    </td>
                  ) : (
                    <td className="common__table-cell common__table-cell--left">
                      {element.code && element.code + "."}
                      {element.alias || element.name}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      show={selectEvent === showEvent}
    />
  );
};

export default SimpleTypeCountRule;
