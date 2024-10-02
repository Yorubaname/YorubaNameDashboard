import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { NamesList } from "./list";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export const NameEntriesCreate = () => {
  const go = useGo();
  const goToPageList = () => {
    go({
      to: { resource: "names", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { formProps, modalProps, onFinish } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "names",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToPageList,
  });

  const handleOnFinish = (values: any) => {
    onFinish({
      name: `${values.name}`,
      pronunciation: `${values.pronunciation}`,
      meaning: `${values.meaning}`,
      extendedMeaning: `${values.extendedMeaning}`,
      state: `NEW`,
      morphology: `${values.morphology}`,
      famousPeople: `${values.famousPeople}`,
      syllables: `${values.syllables}`,
      variants: `${values.variants}`,
      media: `${values.media}`,
      submittedBy: `${localStorage.username}`,
      roles: [`${values.roles}`],
    });
  };

  const formStyle = {
    maxWidth: "none",
    padding: 12,
  };

  return (
    <NamesList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToPageList}
        title="Create Name"
        width={1050}
        height={512}
      >
        <Form
          {...formProps}
          layout="vertical"
          style={formStyle}
          onFinish={handleOnFinish}
        >
          <Row>
            <Col span={12} style={formStyle}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Please enter name" defaultValue={"test"} />
              </Form.Item>
            </Col>

            <Col span={12} style={formStyle}>
              <Form.Item
                label="Morphology"
                name="morphology"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter morphology by using hyphen to separate each part, e.g. olú-ní-iyì"
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Second Row */}

          <Row>
            <Col span={12} style={formStyle}>
              <Form.Item
                label="Meaning"
                name="meaning"
                rules={[{ required: true }]}
              >
                <TextArea
                  placeholder="If meaning of name is not known, write unknown in the space provided. If name has more than one meaning, kindly separate each with comma."
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
            <Col span={12} style={formStyle}>
              <Form.Item label="Variants" name="variant">
                <TextArea
                  placeholder="Enter other known variations for this name. Use comma to separate the different variations."
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* third row */}
          <Row>
            <Col span={12} style={formStyle}>
              <Form.Item label="Syllable breakdown" name="syllable">
                <TextArea
                  placeholder="Enter syllable breakdown by separating each syllable with an hyphen, e.g o-lú-ní-yì"
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
            <Col span={12} style={formStyle}>
              <Form.Item label="Famous People" name="famousPeople">
                <TextArea
                  placeholder="Enter names of famous people bearing this name. Use comma to separate names."
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* fourth row */}
          <Row>
            <Col span={12} style={formStyle}>
              <Form.Item label="Geolocation" name="geolocation">
                <TextArea
                  placeholder="Where is this name most commonly used? Choose General if this name applies to more than one region, or chosse Others/Don't Know if you are not sure of its specific origin."
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
            <Col span={12} style={formStyle}>
              <Form.Item label="Media Link" name="media">
                <TextArea
                  placeholder="Enter links to resources that can be found online for this name. Use comma to separate links."
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* fifth row */}
          <Row>
            <Col span={12} style={formStyle}>
              <Form.Item
                label="Extra information about this name"
                name="extrainfo"
              >
                <TextArea defaultValue={"test"} />
              </Form.Item>
            </Col>
            <Col span={12} style={formStyle}>
              <Form.Item label="Pronunciation" name="pronunciation">
                <Input
                  placeholder="If you can't properly tone-mark the name, give us your best alphabetic English approximation of how the name is pronounced. e.g. Oh-loo-nee-yee"
                  defaultValue={"test"}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </NamesList>

    //TODO : Add gloss, embedded videos, and IPA notation
  );
};
