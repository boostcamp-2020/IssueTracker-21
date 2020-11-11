import styled from "styled-components";

const DetailEditorArea = styled.div`
  width: 100%;
  display: flex;
`;

const DetailButtonsStyle = styled.div`
  display: flex;
  justify-items: flex-end;
`;

const EditorAreaStyle = styled.div`
  width: 85%;
`;

const ProfileStyle = styled.div`
  width: 5%;
  margin-right: 3%;
`;

const UserProfileStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CommonIssueStyle = styled.button`
  border-radius: 2.5px;
  font-weight: bold;
  margin: 0 1%;
  border: 1px solid #777777;
`;

const CloseIssueStyle = styled(CommonIssueStyle)`
  background-color: #fafbfc;
  color: black;
`;

const ReopenIssueStyle = styled(CommonIssueStyle)`
  background-color: #fafbfc;
  color: black;
`;

const CommentStyle = styled(CommonIssueStyle)`
  background-color: #2cbe4e;
  color: white;
`;

const NottypeStyle = styled(CommentStyle)`
  opacity: 0.5;
`;

const HiddenStyle = styled.button`
  display: none;
`;

export default {
  DetailEditorArea,
  DetailButtonsStyle,
  EditorAreaStyle,
  ProfileStyle,
  UserProfileStyle,
  CloseIssueStyle,
  ReopenIssueStyle,
  CommentStyle,
  NottypeStyle,
  HiddenStyle,
};
