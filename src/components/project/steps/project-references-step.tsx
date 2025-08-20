import ProjectStepLayout from '@/components/project/layout/project-step-layout'
import ProjectStepSection from '@/components/project/layout/project-step-section'
import { useProjectFormFieldsValid } from '@/hooks/use-project-fields-valid'
import { projectFormAtom } from '@/store/project-store'
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import type { DropzoneProps, FileWithPath } from '@mantine/dropzone'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useListState } from '@mantine/hooks'
import { useAtom } from 'jotai'
import { File, Upload, X } from 'lucide-react'
import { useEffect } from 'react'

export function ReferencesDropzone(
  props: Partial<DropzoneProps> & {
    onCompleted: any
  },
) {
  const [project] = useAtom(projectFormAtom)

  const initialFiles = (project.fileReferences || []) as Array<FileWithPath>
  const [fileReferences, handlers] = useListState<FileWithPath>(initialFiles)

  useEffect(() => {
    props.onCompleted(fileReferences)
  }, [fileReferences])

  return (
    <Stack w="100%">
      <Dropzone
        onDrop={(files) => handlers.append(...files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Stack
          justify="center"
          align="center"
          mih={100}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <Upload size={30} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X size={30} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Upload size={30} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="lg" inline ta="center">
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" ta="center" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Stack>
      </Dropzone>
      <Stack gap={10}>
        {fileReferences.map((file, index) => (
          <Card w="100%" withBorder shadow="none" p={10}>
            <Group justify="space-between">
              <Group>
                <File />
                <Stack gap={4}>
                  <Text fz={12}>{file.name}</Text>
                  <Text fz={12}>{file.size}</Text>
                </Stack>
              </Group>
              <ActionIcon
                variant="transparent"
                onClick={() => handlers.remove(index)}
              >
                <X size={20} />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

const LinkInput = ({ value, onChange, onRemove }) => {
  return (
    <Group gap={6}>
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://exemple.com/inspiration"
        onBlur={() => {}}
        style={{
          flex: 1,
        }}
      />
      <ActionIcon
        variant="outline"
        onClick={onRemove}
        h="100%"
        style={{
          aspectRatio: 1,
          width: 'auto',
        }}
      >
        <X />
      </ActionIcon>
    </Group>
  )
}

const ProjectReferencesStep = () => {
  const isValid = useProjectFormFieldsValid(['urlReferences', 'fileReferences'])
  const [project, updateProject] = useAtom(projectFormAtom)

  const initialUrls = (project.urlReferences || []) as Array<string>
  const [urlReferences, handlers] = useListState<string>(initialUrls)

  useEffect(() => {
    updateProject((prevProject) => ({
      ...prevProject,
      urlReferences,
    }))
  }, [urlReferences])

  return (
    <ProjectStepLayout
      title="Partagez vos références visuelles"
      description="Aidez-nous à comprendre le style et l'esthétique souhaités"
      isValid={isValid}
    >
      <Stack gap={30} w="100%">
        <ProjectStepSection
          title="Images et documents de référence"
          description="Uploadez des images, croquis, ou documents qui illustrent votre vision"
        >
          <ReferencesDropzone
            onCompleted={(files) =>
              updateProject((prevProject) => ({
                ...prevProject,
                fileReferences: files,
              }))
            }
          />
        </ProjectStepSection>

        <ProjectStepSection
          title="Liens de référence"
          description="Partagez des liens vers des exemples qui vous inspirent"
        >
          <Stack>
            <Stack gap={8}>
              {urlReferences?.map((reference, index) => (
                <LinkInput
                  value={reference}
                  onChange={(value) => handlers.setItem(index, value)}
                  onRemove={() => handlers.remove(index)}
                />
              ))}
            </Stack>
            <Button
              variant="subtle"
              fullWidth
              onClick={() => handlers.append('')}
            >
              Ajouter une référence
            </Button>
          </Stack>
        </ProjectStepSection>
      </Stack>
    </ProjectStepLayout>
  )
}

export default ProjectReferencesStep
