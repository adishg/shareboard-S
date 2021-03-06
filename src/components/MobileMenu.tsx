import React, { BaseSyntheticEvent } from "react";
import { AppState } from "../types";
import { ActionManager } from "../actions/manager";
import { t } from "../i18n";
import Stack from "./Stack";
import { showSelectedShapeActions } from "../element";
import { NonDeletedExcalidrawElement } from "../element/types";
import { FixedSideContainer } from "./FixedSideContainer";
import { Island } from "./Island";
import { HintViewer } from "./HintViewer";
import { calculateScrollCenter } from "../scene";
import { SelectedShapeActions, ShapesSwitcher } from "./Actions";
import { Section } from "./Section";
import CollabButton from "./CollabButton";
import { SCROLLBAR_WIDTH, SCROLLBAR_MARGIN } from "../scene/scrollbars";
import { LockIcon } from "./LockIcon";
import { SignOut } from "./SignOut";
import { BackgroundPickerAndDarkModeToggle } from "./BackgroundPickerAndDarkModeToggle";
import { UploadIcon } from "./UploadIcon";

type MobileMenuProps = {
  appState: AppState;
  actionManager: ActionManager;
  exportButton: React.ReactNode;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedExcalidrawElement[];
  libraryMenu: JSX.Element | null;
  onCollabButtonClick?: () => void;
  onLockToggle: () => void;
  canvas: HTMLCanvasElement | null;
  isCollaborating: boolean;
  onDocUploadClick: (e: BaseSyntheticEvent) => void;
  renderCustomFooter?: (isMobile: boolean) => JSX.Element;
};

export const MobileMenu = ({
  appState,
  elements,
  libraryMenu,
  actionManager,
  exportButton,
  setAppState,
  onCollabButtonClick,
  onLockToggle,
  onDocUploadClick,
  canvas,
  isCollaborating,
  renderCustomFooter,
}: MobileMenuProps) => (
  <>
    <FixedSideContainer side="top">
      <Section heading="shapes">
        {(heading) => (
          <Stack.Col gap={4} align="center">
            <Stack.Row gap={1}>
              <Island padding={1}>
                {heading}
                <Stack.Row gap={1}>
                  <ShapesSwitcher
                    elementType={appState.elementType}
                    setAppState={setAppState}
                    isLibraryOpen={appState.isLibraryOpen}
                  />
                  <UploadIcon

                    title="Upload"
                    onClick={onDocUploadClick}

                  />
                </Stack.Row>
              </Island>

              <LockIcon
                checked={appState.elementLocked}
                onChange={onLockToggle}
                title={t("toolBar.lock")}
              />
            </Stack.Row>
            {libraryMenu}
          </Stack.Col>
        )}
      </Section>
      <HintViewer appState={appState} elements={elements} />
    </FixedSideContainer>
    <div
      className="App-bottom-bar"
      style={{
        marginBottom: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2,
        marginLeft: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2,
        marginRight: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2,
      }}
    >
      <Island padding={0}>
        {appState.openMenu === "canvas" ? (
          <Section className="App-mobile-menu" heading="canvasActions">
            <div className="panelColumn">
              <Stack.Col gap={4}>
                {actionManager.renderAction("loadScene")}
                {actionManager.renderAction("saveScene")}
                {actionManager.renderAction("saveAsScene")}
                {exportButton}
                {actionManager.renderAction("clearCanvas")}
                {onCollabButtonClick && (
                  <CollabButton
                    isCollaborating={isCollaborating}
                    collaboratorCount={appState.collaborators.size}
                    onClick={onCollabButtonClick}
                  />
                )}
                <BackgroundPickerAndDarkModeToggle
                  actionManager={actionManager}
                  appState={appState}
                  setAppState={setAppState}
                />
                {renderCustomFooter?.(true)}
                <fieldset>
                  <legend>{t("labels.collaborators")}</legend>
                  <SignOut mobile>
                    {Array.from(appState.collaborators)
                      // Collaborator is either not initialized or is actually the current user.
                      .filter(([_, client]) => Object.keys(client).length !== 0)
                      .map(([clientId, client]) => (
                        <React.Fragment key={clientId}>
                          {actionManager.renderAction(
                            "goToCollaborator",
                            clientId,
                          )}
                        </React.Fragment>
                      ))}
                  </SignOut>
                </fieldset>
              </Stack.Col>
            </div>
          </Section>
        ) : appState.openMenu === "shape" &&
          showSelectedShapeActions(appState, elements) ? (
          <Section className="App-mobile-menu" heading="selectedShapeActions">
            <SelectedShapeActions
              appState={appState}
              elements={elements}
              renderAction={actionManager.renderAction}
              elementType={appState.elementType}
            />
          </Section>
        ) : null}
        <footer className="App-toolbar">
          <div className="App-toolbar-content">
            {actionManager.renderAction("toggleCanvasMenu")}
            {actionManager.renderAction("toggleEditMenu")}
            {actionManager.renderAction("undo")}
            {actionManager.renderAction("redo")}
            {actionManager.renderAction(
              appState.multiElement ? "finalize" : "duplicateSelection",
            )}
            {actionManager.renderAction("deleteSelectedElements")}
          </div>
          {appState.scrolledOutside && !appState.openMenu && (
            <button
              className="scroll-back-to-content"
              onClick={() => {
                setAppState({
                  ...calculateScrollCenter(elements, appState, canvas),
                });
              }}
            >
              {t("buttons.scrollBackToContent")}
            </button>
          )}
        </footer>
      </Island>
    </div>
  </>
);
