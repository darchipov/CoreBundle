<?php

namespace Ekyna\Bundle\CoreBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class FileType
 * @package Ekyna\Bundle\CoreBundle\Form\Type
 * @author Étienne Dauvergne <contact@ekyna.com>
 */
class FileType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if ($options['rename_field']) {
            $builder->add('rename', 'text', array(
                'label' => 'ekyna_core.field.rename',
                'required' => $options['required'],
                'sizing' => 'sm',
                'admin_helper' => 'FILE_RENAME',
                'attr' => array(
                    'class' => 'file-rename',
                    'label_col' => 2,
                    'widget_col' => 10
                ),
            ));
        }

        $builder->addEventListener(
            FormEvents::PRE_SET_DATA,
            function(FormEvent $event) use ($options) {
                $form = $event->getForm();
                /** @var \Ekyna\Bundle\CoreBundle\Model\FileInterface $file */
                $file = $event->getData();

                if (null !== $file && null !== $file->getPath()) {
                    $form->add('file', 'file', array(
                        'label' => 'ekyna_core.field.file',
                        'required' => false,
                        'sizing' => 'sm',
                        'admin_helper' => 'FILE_UPLOAD',
                        'attr' => array(
                            'label_col' => 2,
                            'widget_col' => 10
                        )
                    ));
                } else {
                    $form->add('file', 'file', array(
                        'label' => 'ekyna_core.field.file',
                        'required' => $options['required'],
                        'sizing' => 'sm',
                        'admin_helper' => 'FILE_UPLOAD',
                        'attr' => array(
                            'label_col' => 2,
                            'widget_col' => 10
                        )
                    ));
                }
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'label' => 'ekyna_core.field.file',
                'data_class' => null,
                'rename_field'  => true,
            ))
            ->setRequired(array('data_class'))
            ->setAllowedTypes(array(
                'data_class' => 'string',
            ))
        ;
    }


    public function getName()
    {
        return 'ekyna_core_file';
    }
}
